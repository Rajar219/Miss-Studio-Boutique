import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-wine mb-4">Contact Us</h1>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            We would love to hear from you. Whether you&apos;re looking for the perfect bridal saree or need assistance with your order, our boutique consultants are here to help.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="w-full lg:w-1/3">
            <h2 className="font-serif text-3xl text-wine mb-8">Get in Touch</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-wine/5 rounded-full flex items-center justify-center shrink-0 text-wine">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-foreground">Online Boutique</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    We operate exclusively online. While we don't have a physical store for visits, we are delighted to ship our beautiful collections to you anywhere in India.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-wine/5 rounded-full flex items-center justify-center shrink-0 text-wine">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-foreground">Call or Chat</h3>
                  <p className="text-foreground/70 mb-3">+91 63820 88191</p>
                  <a href="https://wa.me/916382088191" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#20bd5a] transition-colors">
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-wine/5 rounded-full flex items-center justify-center shrink-0 text-wine">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-foreground">Email Us</h3>
                  <p className="text-foreground/70">missstudio1512@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-wine/5 rounded-full flex items-center justify-center shrink-0 text-wine">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-foreground">Opening Hours</h3>
                  <p className="text-foreground/70">Monday - Saturday: 10am - 8pm</p>
                  <p className="text-foreground/70">Sunday: 11am - 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gold/20">
            <h2 className="font-serif text-3xl text-wine mb-8">Send us a Message</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground/80">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-background/50 border border-gold/30 rounded-lg px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground/80">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-background/50 border border-gold/30 rounded-lg px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-background/50 border border-gold/30 rounded-lg px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground/80">Subject</label>
                <select
                  id="subject"
                  className="w-full bg-background/50 border border-gold/30 rounded-lg px-4 py-3 focus:outline-none focus:border-wine transition-colors"
                >
                  <option>General Inquiry</option>
                  <option>Bridal Consultation</option>
                  <option>Order Status</option>
                  <option>Returns & Exchanges</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-background/50 border border-gold/30 rounded-lg px-4 py-3 focus:outline-none focus:border-wine transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button type="button" className="w-full bg-wine hover:bg-wine/90 text-white py-4 rounded-lg font-medium transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
