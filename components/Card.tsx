interface CardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string; // Allow custom styles if needed
}

export default function Card({ title, description, children, className = "" }: CardProps) {
    return (
        <div className={`bg-zinc-50 border border-zinc-200 dark:bg-zinc-900/30 backdrop-blur-3xl dark:border-white/10 rounded-3xl p-6 shadow-lg ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
                {description && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
                )}
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
