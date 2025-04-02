"use client";

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Reset the form
  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };
  
  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus('idle');
    setErrorMessage('');
    
    // Validate form fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Success!
      setSubmitStatus('success');
      resetForm();
      
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Your Name</label>
        <input 
          type="text" 
          id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="glass-input w-full transition-all hover:shadow-glow-sm focus:shadow-glow-sm"
          placeholder="John Doe"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Your Email</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="glass-input w-full transition-all hover:shadow-glow-sm focus:shadow-glow-sm"
          placeholder="john@example.com"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
        <textarea 
          id="message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="glass-input w-full transition-all hover:shadow-glow-sm focus:shadow-glow-sm resize-none"
          rows={4}
          placeholder="Your message here..."
          disabled={isSubmitting}
        ></textarea>
      </div>
      
      {/* Status messages */}
      {submitStatus === 'success' && (
        <div className="py-3 px-4 rounded-lg bg-green-900/30 border border-green-700 text-green-400">
          Message sent successfully! I&apos;ll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="py-3 px-4 rounded-lg bg-red-900/30 border border-red-700 text-red-400">
          {errorMessage || 'Failed to send message. Please try again.'}
        </div>
      )}
      
      <button 
        type="submit" 
        className={`btn-primary w-full flex justify-center items-center ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
            Sending...
          </>
        ) : 'Send Message'}
      </button>
    </form>
  );
}