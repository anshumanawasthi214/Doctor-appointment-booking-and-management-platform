import { cn } from "../../utils/format";

function Card({ children, className = "" }) {
  return <section className={cn("rounded-xl bg-white p-6 shadow-md", className)}>{children}</section>;
}

export default Card;
