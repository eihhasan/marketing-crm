import React, { useState } from 'react';
import { useCRMStore } from '../store/crmStore';
import { DealStage, Lead } from '../types';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import { MoreHorizontal, Calendar, DollarSign, Plus } from 'lucide-react';

const STAGES: DealStage[] = [
  'New Lead',
  'Contacted',
  'Demo Scheduled',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
];

// Sortable Item Component (Card)
function SortableItem({ lead }: { lead: Lead }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id, data: { type: 'Lead', lead } });
  
  const { setSelectedLeadId } = useCRMStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-zinc-50 p-4 rounded-xl shadow-xl border border-zinc-200 opacity-80 h-[140px] rotate-2"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setSelectedLeadId(lead.id)}
      className="bg-white p-4 rounded-xl border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:border-zinc-200 transition-all cursor-grab active:cursor-grabbing group"
    >
      <div className="flex justify-between items-start mb-3">
        <span className={clsx(
          "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide",
          lead.priority === 'High' ? "bg-rose-50 text-rose-700" :
          lead.priority === 'Medium' ? "bg-amber-50 text-amber-700" :
          "bg-zinc-100 text-zinc-600"
        )}>
          {lead.priority}
        </span>
        <button className="text-zinc-300 hover:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <h4 className="font-semibold text-zinc-900 text-sm mb-0.5">{lead.name}</h4>
      <p className="text-xs text-zinc-500 mb-4">{lead.company}</p>
      
      <div className="flex items-center justify-between text-xs pt-3 border-t border-zinc-50">
        <div className="flex items-center gap-1.5 text-zinc-700 font-medium bg-zinc-50 px-2 py-1 rounded-md">
          <DollarSign className="w-3 h-3 text-zinc-400" />
          <span>{lead.dealValue.toLocaleString()}</span>
        </div>
        {lead.nextFollowUp && (
           <div className="flex items-center gap-1.5 text-zinc-500">
             <Calendar className="w-3 h-3" />
             <span>{new Date(lead.nextFollowUp).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
           </div>
        )}
      </div>
    </div>
  );
}

// Column Component
function Column({ id, leads }: { id: string; leads: Lead[] }) {
  const { setNodeRef } = useSortable({ id: id, data: { type: 'Column', id } });

  return (
    <div className="flex flex-col w-80 shrink-0 h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
          {id}
          <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full text-xs font-medium">
            {leads.length}
          </span>
        </h3>
        <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div ref={setNodeRef} className="bg-zinc-50/50 rounded-2xl p-2 flex-1 overflow-y-auto min-h-[100px]">
        <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 pb-20">
            {leads.map((lead) => (
              <SortableItem key={lead.id} lead={lead} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { leads, moveLeadStage, setAddLeadModalOpen } = useCRMStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Optional: Add logic for visual feedback during drag over columns
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    // Find the lead being dragged
    const lead = leads.find(l => l.id === activeLeadId);
    if (!lead) return;

    // If dropped on a column container
    if (STAGES.includes(overId as DealStage)) {
        if (lead.stage !== overId) {
            moveLeadStage(activeLeadId, overId as DealStage);
        }
    } else {
        // If dropped on another item, find that item's column
        const overLead = leads.find(l => l.id === overId);
        if (overLead && lead.stage !== overLead.stage) {
            moveLeadStage(activeLeadId, overLead.stage);
        }
    }

    setActiveId(null);
  };

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Pipeline</h1>
            <p className="text-zinc-500 mt-1">Drag and drop deals to update their stage.</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-white border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm">
                Filter
            </button>
            <button 
                onClick={() => setAddLeadModalOpen(true)}
                className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20"
            >
                Add Deal
            </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4 h-full scrollbar-hide">
          {STAGES.map((stage) => (
            <Column key={stage} id={stage} leads={leads.filter((l) => l.stage === stage)} />
          ))}
        </div>

        <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }}>
          {activeLead ? <div className="transform rotate-3"><SortableItem lead={activeLead} /></div> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
