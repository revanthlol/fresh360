"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  name: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
}

export function CustomSelect({ options, name, defaultValue, placeholder = "Select an option", required }: CustomSelectProps) {
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
    <div className="relative" ref={containerRef}>
      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
        name={name} 
        value={selected?.value || ""} 
        required={required}
      />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-center justify-between transition-all outline-none",
          isOpen ? "ring-2 ring-brand-green/20 border-brand-green" : "hover:border-slate-300"
        )}
      >
        <span className={cn(
          "block truncate",
          !selected ? "text-slate-400" : "text-slate-900"
        )}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown 
          size={20} 
          className={cn(
            "text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden mt-1"
          >
            <ul className="py-2 max-h-60 overflow-auto">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "w-full px-6 py-3 text-left text-sm transition-colors flex items-center justify-between group",
                      selected?.value === option.value 
                        ? "bg-brand-green/10 text-brand-green font-bold" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {option.label}
                    {selected?.value === option.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
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
