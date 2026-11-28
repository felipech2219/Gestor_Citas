import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-indigo-600 text-white shadow-xs hover:bg-indigo-700",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        destructive:
          "border-transparent bg-red-600 text-white shadow-xs hover:bg-red-700",
        outline: "text-gray-950 border-gray-300",
        success:
          "border-transparent bg-green-50 text-green-700 border-green-200",
        warning:
          "border-transparent bg-amber-50 text-amber-700 border-amber-200",
        info:
          "border-transparent bg-indigo-50 text-indigo-700 border-indigo-200",
        purple:
          "border-transparent bg-purple-50 text-purple-700 border-purple-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
