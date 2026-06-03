interface StatePanelProps {
    title: string;
    description: string;
}

export function StatePanel({ title, description }: StatePanelProps) {
    return (
        <section className="state-panel">
            <h2>{title}</h2>
            <p>{description}</p>
        </section>
    );
}
