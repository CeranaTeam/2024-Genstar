// "use client"

// import * as React from "react"
// import { Check, ChevronsUpDown } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandList,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]

// export default function AutoCompleteTextArea() {
//   const [open, setOpen] = React.useState(false)
//   const [value, setValue] = React.useState("")

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           {value
//             ? frameworks.find((framework) => framework.value === value)?.label
//             : "Select framework..."}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search framework..." />
//           <CommandEmpty>No framework found.</CommandEmpty>
//           <CommandGroup>
//             <CommandList>
//             {frameworks.map((framework) => (
//               <CommandItem
//                 key={framework.value}
//                 value={framework.value}
//                 onSelect={(currentValue) => {
//                   setValue(currentValue === value ? "" : currentValue)
//                   setOpen(false)
//                 }}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     value === framework.value ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//                 {framework.label}
//               </CommandItem>
//             ))}
//             </CommandList>
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )
// }


import React, { useState } from 'react';

// Example list of suggestions
const suggestionsList = [
  'apple',
  'banana',
  'grape',
  'orange',
  'pear',
  'pineapple',
  'strawberry',
  'watermelon'
];

const TextareaWithAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  // Handle input change
  const handleChange = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput);

    const filtered = suggestionsList.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);
  };

  // Handle suggestion click
  const handleClick = (e) => {
    setInputValue(e.target.innerText);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle key down events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setInputValue(filteredSuggestions[activeSuggestionIndex]);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex === 0) return;
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) return;
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = 'suggestion-active';
          }
          return (
            <li className={className} key={suggestion} onClick={handleClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

  return (
    <div className="autocomplete">
      <textarea
        type="text"
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && inputValue && <SuggestionsListComponent />}
    </div>
  );
};

export default TextareaWithAutocomplete;
