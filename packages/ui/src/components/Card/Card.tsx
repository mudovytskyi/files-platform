interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>;
}

Card.Header = function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`border-b border-gray-200 p-4 ${className}`}>{children}</div>;
};

Card.Content = function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
