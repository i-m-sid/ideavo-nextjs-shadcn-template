When using client-side hooks (useState and useEffect) in a component that's being treated as a Server Component by Next.js, always add the "use client" directive at the top of the file.

Do not write code that will trigger this error: "Warning: Extra attributes from the server: %s%s""class,style"

By default, this template supports JSX syntax with Tailwind CSS classes, the shadcn/ui library, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

Use icons from lucide-react for logos.

Use stock photos from unsplash where appropriate, only valid URLs you know exist.

IMPORTANT: Never modify files in the following path:
- src/components/ui/*
- .gitignore
- .ideavo/*

CRITICAL: Always use .env file for environment variables, NEVER create new files like .env.local or .env.example
