import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex flex-col gap-8">
        <div className="text-xl font-bold tracking-tighter">TRAVELOOP</div>
        <nav className="flex flex-col gap-2 flex-1">
          {['Overview', 'My Trips', 'AI Planner', 'Budget', 'Settings'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                item === 'Overview' ? 'bg-purple-600/10 text-purple-400' : 'text-muted-foreground hover:bg-white/5'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="glass p-4 rounded-xl text-xs space-y-2">
          <p className="font-bold">Pro Plan</p>
          <p className="text-muted-foreground">Unlock unlimited AI generation and real-time collab.</p>
          <button className="w-full py-2 bg-purple-600 rounded-lg font-bold">Upgrade</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold">Welcome back, Traveler</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
