"use client"

import { Check } from "lucide-react"
import type { AIProvider } from "@/lib/ai-providers"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

interface AIProviderSelectorProps {
  providers: AIProvider[]
  selectedProvider: AIProvider
  onProviderChange: (provider: AIProvider) => void
}

export function AIProviderSelector({ providers, selectedProvider, onProviderChange }: AIProviderSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          <div className="flex items-center gap-2">
            {selectedProvider.icon && <selectedProvider.icon className="h-5 w-5" />}
            {selectedProvider.name}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder="AI sağlayıcı ara..." />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
            <CommandGroup>
              {providers.map((provider) => (
                <CommandItem
                  key={provider.id}
                  value={provider.name}
                  onSelect={() => {
                    onProviderChange(provider)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    {provider.icon && <provider.icon className="h-5 w-5" />}
                    {provider.name}
                  </div>
                  <Check
                    className={`ml-auto h-4 w-4 ${selectedProvider.id === provider.id ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
