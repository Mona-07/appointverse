
import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const responses = [
  "Hello! How can I help you book an appointment today?",
  "I'd be happy to help you find the perfect service. What type of appointment are you looking for?",
  "Our most popular wellness services include therapeutic massage and yoga sessions. Would you like to book one of these?",
  "We have availability with Dr. Monisha P this week. She's one of our top-rated practitioners.",
  "You can easily reschedule your appointment up to 24 hours before the scheduled time without any cancellation fee.",
  "Our Delhi location is open from 9 AM to 8 PM on weekdays and 10 AM to 6 PM on weekends.",
  "For the best experience, please arrive 15 minutes before your scheduled appointment time.",
  "Would you prefer morning or evening appointments? We have several slots available.",
  "I can see you're interested in wellness services. We have special packages that might save you money if you book multiple sessions."
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    { text: "Hi there! I'm your AI booking assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
    }, 1000);
    
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed right-6 bottom-6 z-50 rounded-full h-14 w-14 shadow-lg bg-teal-600 hover:bg-teal-700 p-0 flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
      >
        <Bot size={24} />
      </Button>

      {/* Chat window */}
      <div className={`fixed bottom-6 right-6 z-50 w-full max-w-md transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-teal-600 text-white py-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot size={20} />
              <h3 className="font-semibold">AI Booking Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-teal-700">
              <X size={20} />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end gap-2">
              <Textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-grow resize-none"
                rows={2}
              />
              <Button 
                onClick={handleSend} 
                className="bg-teal-600 hover:bg-teal-700 h-10 w-10 p-0"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
