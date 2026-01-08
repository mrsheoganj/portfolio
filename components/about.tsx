export default function AboutSection({ text }: { text: string }) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
                <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm">
                <p className="text-lg text-gray-600 leading-relaxed">
                    {text || "I am a passionate designer dedicated to creating beautiful and functional designs."}
                </p>
                <div className="mt-8 flex justify-center space-x-8">
                     <div className="text-center">
                         <span className="block text-3xl font-bold text-gray-900">5+</span>
                         <span className="text-sm text-gray-500">Years Exp.</span>
                     </div>
                     <div className="text-center">
                         <span className="block text-3xl font-bold text-gray-900">100+</span>
                         <span className="text-sm text-gray-500">Projects</span>
                     </div>
                     <div className="text-center">
                         <span className="block text-3xl font-bold text-gray-900">50+</span>
                         <span className="text-sm text-gray-500">Happy Clients</span>
                     </div>
                </div>
            </div>
        </div>
      </section>
    );
  }
