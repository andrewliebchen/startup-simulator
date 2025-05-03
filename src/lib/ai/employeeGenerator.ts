interface Employee {
  name: string;
  role: string;
  traits: string[];
}

export async function generateInitialEmployees(): Promise<Employee[]> {
  // For now, return some hardcoded employees
  // Later we'll use AI to generate more interesting ones
  return [
    {
      name: "Alex Chen",
      role: "CTO",
      traits: ["technical", "visionary", "perfectionist"]
    },
    {
      name: "Sam Rodriguez",
      role: "Head of Product",
      traits: ["strategic", "user-focused", "ambitious"]
    },
    {
      name: "Jordan Taylor",
      role: "Marketing Lead",
      traits: ["creative", "outgoing", "data-driven"]
    }
  ];
} 