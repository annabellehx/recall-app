interface CardLayoutProps {
  children: React.ReactNode;
}

export default function CardsLayout({ children }: CardLayoutProps) {
  return (
    <div className="flex items-center justify-between p-5">{children}</div>
  );
}
