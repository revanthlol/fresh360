"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  name: string
  label?: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
}

export function CustomSelect({ options, name, label = name, defaultValue, placeholder = "Select an option", required }: CustomSelectProps) {
  const reduceMotion = useReducedMotion()
  const [keyboardAction, setKeyboardAction] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Option | null>(
    options.find(opt => opt.value === defaultValue) || null
  )
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: Option) => {
    setSelected(option)
    setIsOpen(false)
  }

  return (
    <div className="relative min-w-0" ref={containerRef}>
      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
        name={name} 
        value={selected?.value || ""} 
        required={required}
      />
      
      <select aria-label={label} value={selected?.value || ''} onChange={(event) => setSelected(options.find((option) => option.value === event.target.value) || null)} className="block min-h-12 w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green sm:hidden">
        {!selected && <option value="">{placeholder}</option>}
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <button
        type="button"
        onClick={(event) => { setKeyboardAction(event.detail === 0); setIsOpen(!isOpen) }}
        aria-expanded={isOpen}
        aria-label={label}
        onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false) }}
        className={cn(
          "hidden sm:flex min-w-0 w-full px-6 py-4 rounded-2xl bg-white border text-left items-center justify-between transition-colors duration-180 outline-none group",
          isOpen 
            ? "ring-4 ring-brand-green/10 border-brand-green shadow-lg" 
            : "border-slate-200 hover:border-slate-300 hover:shadow-md"
        )}
      >
        <span className={cn(
          "block min-w-0 flex-1 truncate font-medium",
          !selected ? "text-slate-400" : "text-slate-900"
        )}>
          {selected ? selected.label : placeholder}
        </span>
        <div className={cn(
          "ml-2 shrink-0 p-1 rounded-full transition-colors duration-180",
          isOpen ? "bg-brand-green text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
        )}>
          <ChevronDown 
            size={16} 
            className={cn(
              "transition-transform duration-160",
              isOpen && "rotate-180"
            )} 
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, transform: reduceMotion || keyboardAction ? "translateY(0px) scale(1)" : "translateY(4px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: reduceMotion || keyboardAction ? "translateY(0px) scale(1)" : "translateY(2px) scale(0.98)" }}
            transition={{ duration: reduceMotion || keyboardAction ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="hidden sm:block absolute z-50 w-full bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden origin-top mt-2 p-2"
          >
            <ul className="max-h-64 overflow-auto custom-scrollbar">
              {options.map((option) => (
                <li key={option.value} className="mb-1 last:mb-0">
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm rounded-xl transition-colors flex items-center justify-between group",
                      selected?.value === option.value 
                        ? "bg-brand-green text-white font-bold shadow-md shadow-brand-green/20" 
                        : "text-slate-600 hover:bg-brand-green/5 hover:text-brand-green"
                    )}
                  >
                    <span className="break-words">{option.label}</span>
                    {selected?.value === option.value && (
                      <motion.div 
                        initial={false}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white" 
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
