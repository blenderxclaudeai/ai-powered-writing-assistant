// Payments - payment component
// Configure your payments settings

export default function Payments() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Payments</h1>
        <p className="text-muted-foreground mb-8">Configure your payments settings</p>
        
        {/* Implementation steps */}
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">1. First step</h3>
            <p className="text-sm text-muted-foreground">Add your first step</p>
          </div>
        </div>
      </div>
    </div>
  );
}