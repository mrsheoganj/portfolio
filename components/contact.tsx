export default function ContactSection({ email }: { email: string }) {
    return (
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                Have a project in mind? I'm available for freelance work and collaborations. 
                Let's create something amazing.
            </p>
            
            <div className="bg-gray-800 p-8 rounded-2xl max-w-lg mx-auto shadow-lg">
                <form action={`mailto:${email}`} method="post" encType="text/plain" className="space-y-4">
                    <div>
                        <input type="text" placeholder="Your Name" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400" />
                    </div>
                    <div>
                        <input type="email" placeholder="Your Email" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400" />
                    </div>
                    <div>
                        <textarea rows={4} placeholder="Tell me about your project" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400"></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                        Send Message
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-500">
                    Alternatively, email me at <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a>
                </p>
            </div>
        </div>
      </section>
    );
  }
