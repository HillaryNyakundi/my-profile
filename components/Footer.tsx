export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Hillary Nyakundi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
