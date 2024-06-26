"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function AutoCompleteTextArea() {
  // const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [search, setSearch] = React.useState("")

  // automatically open the list when the user starts typing
  // React.useEffect(() => {
  //   if(value){
  //       setOpen(true)
  //   }
  //   else{
  //       setOpen(false)
  //   }
  //   }, [value])

  return (
    <Command>
        <CommandInput placeholder="Search Medicine..."
        value={search} onValueChange={setSearch}
        />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>
        <CommandList>
        {frameworks.map((framework) => (
            <CommandItem
            key={framework.value}
            value={framework.value}
            onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue)
                setSearch(currentValue === value ? "" : currentValue)
                // setOpen(false)
            }}
            >
            <Check
                className={cn(
                "mr-2 h-4 w-4",
                value === framework.value ? "opacity-100" : "opacity-0"
                )}
            />
            {framework.label}
            </CommandItem>
        ))}
        </CommandList>
        </CommandGroup>
    </Command>
  )
}