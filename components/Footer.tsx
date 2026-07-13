export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Hillary Nyakundi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
