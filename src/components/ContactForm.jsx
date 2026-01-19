import { useState, useRef } from "react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const subjectRef = useRef(null)
    const messageRef = useRef(null)

    // TODO: Reemplaza esta URL con tu propia URL de Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtuAAqKWwXm6CaPrDPw8CzudYpwHwMwCHtbEm1TZxuIk5pIMehC4dJImodxxLJYNee/exec';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const formData = {
            nombre: nameRef.current.value,
            correo: emailRef.current.value,
            asunto: subjectRef.current.value,
            mensaje: messageRef.current.value,
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            setMessage({ 
                type: 'success', 
                text: '¡Mensaje enviado exitosamente! Te contactaré pronto.' 
            });

            nameRef.current.value = "";
            emailRef.current.value = "";
            subjectRef.current.value = "";
            messageRef.current.value = "";

        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.' 
            });
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="w-full max-w-2xl mx-auto py-6">
            <p className="text-gray-600 text-center mb-8">
                ¿Tienes alguna pregunta o proyecto en mente? ¡Me encantaría saber de ti!
            </p>

            {/* Form Card */}
            <div className="relative">
                {/* Gradient background blur */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl opacity-20 blur-xl"></div>
                
                <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <fieldset className="space-y-6" disabled={loading}>
                        {message.text && (
                            <div className={`p-4 rounded-lg ${
                                message.type === 'success' 
                                    ? 'bg-green-100 text-green-800 border border-green-300' 
                                    : 'bg-red-100 text-red-800 border border-red-300'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre
                            </label>
                            <input 
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                                         bg-white 
                                         text-gray-900
                                         placeholder-gray-400
                                         focus:border-blue-500 
                                         focus:ring-2 focus:ring-blue-200
                                         transition-all duration-300 outline-none
                                         hover:border-blue-300"
                                placeholder="Tu Nombre" 
                                ref={nameRef} 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Correo Electrónico
                            </label>
                            <input 
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                                         bg-white 
                                         text-gray-900
                                         placeholder-gray-400
                                         focus:border-blue-500 
                                         focus:ring-2 focus:ring-blue-200
                                         transition-all duration-300 outline-none
                                         hover:border-blue-300"
                                placeholder="tu@email.com" 
                                ref={emailRef} 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Asunto
                            </label>
                            <input 
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                                         bg-white 
                                         text-gray-900
                                         placeholder-gray-400
                                         focus:border-blue-500 
                                         focus:ring-2 focus:ring-blue-200
                                         transition-all duration-300 outline-none
                                         hover:border-blue-300"
                                placeholder="Asunto del mensaje" 
                                ref={subjectRef} 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mensaje
                            </label>
                            <textarea 
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                                         bg-white 
                                         text-gray-900
                                         placeholder-gray-400
                                         focus:border-blue-500 
                                         focus:ring-2 focus:ring-blue-200
                                         transition-all duration-300 outline-none resize-none
                                         hover:border-blue-300"
                                placeholder="Tu Mensaje" 
                                rows={6} 
                                ref={messageRef} 
                                required 
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-blue-600 
                                     text-white font-semibold py-4 px-6 rounded-lg
                                     hover:bg-blue-700
                                     focus:ring-4 focus:ring-blue-300
                                     transform hover:scale-[1.02] active:scale-[0.98]
                                     transition-all duration-300
                                     shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed" 
                            onClick={handleSubmit}
                        >
                            {loading ? "Enviando..." : "Enviar Mensaje"}
                        </button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}
