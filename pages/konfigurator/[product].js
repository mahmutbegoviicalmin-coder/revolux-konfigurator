import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ChevronDown, ChevronUp, Check, HelpCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Konfigurator() {
  const router = useRouter()
  const { product } = router.query
  const { language } = useLanguage()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [expandedSections, setExpandedSections] = useState({
    profil: true,
    glas: false
  })
  
  const [config, setConfig] = useState({
    system: 'aluplast',
    profil: 'revo4000',
    farbe: 'weiss',
    fenstertyp: 'einteilig',
    oberlicht: 'ohne',
    oeffnungsart: 'festverglast',
    breite: 800,
    hoehe: 1000,
    verglasung: '3fach-07',
    randverbund: 'nein',
    schallschutz: 'nein',
    sicherheit: 'nein'
  })

  const productNames = {
    'revo-neo': 'Revo Neo',
    'revo-4000': 'Revo 4000',
    'revo-7000': 'Revo 7000',
    'revo-8000': 'Revo 8000'
  }

  const profile = [
    { id: 'revo4000', name: 'REVO 4000', features: ['Kantige Optik', '70 mm Bautiefe', '2 Dichtungen'], uw: '0,91', image: '/products/revo 4000/Revolux-4000-webp.webp' },
    { id: 'revoneo', name: 'REVO neo', features: ['Eckige Optik', '76 mm Bautiefe', '2 Dichtungen'], uw: '0,86', image: '/products/revo neo/Revolux-Neo.webp' },
    { id: 'revo7000', name: 'REVO 7000', features: ['Abgerundete Optik', '70 mm Bautiefe', '3 Dichtungen'], uw: '0,87', image: '/products/revo 7000/revolux-prozorski-sistemi-7000.webp' },
    { id: 'revo8000', name: 'REVO 8000', features: ['Eckige Optik', '76 mm Bautiefe', '3 Dichtungen'], uw: '0,83', image: '/products/revo 8000/Revolux-prozorski-sistemi-8000-1.webp' },
  ]

  const farben = [
    { id: 'weiss', name: 'Weiß', color: '#ffffff' },
    { id: 'reinweiss', name: 'Reinweiß strukturell', color: '#f5f5f5' },
    { id: 'cremeweiss', name: 'Cremeweiß strukturell', color: '#fffdd0' },
    { id: 'golden-oak', name: 'Golden Oak', color: '#b8860b' },
    { id: 'nussbaum', name: 'Nussbaum', color: '#5c4033' },
    { id: 'anthrazit', name: 'Anthrazit ähnlich RAL 7016', color: '#3d3d3d' },
  ]

  const fenstertypen = [
    { id: 'einteilig', name: 'Einteilig', image: '/fenstertyp/1_grundmodell.svg' },
    { id: 'zweiteilig', name: 'Zweiteilig', image: '/fenstertyp/2_grundmodell.svg' },
    { id: 'dreiteilig', name: 'Dreiteilig', image: '/fenstertyp/3_grundmodell.svg' },
    { id: 'sondertypen', name: 'Sondertypen', image: '/fenstertyp/sondertypen-selection.svg' },
  ]

  const oeffnungsarten = [
    { id: 'festverglast', name: 'Festverglasung', image: null },
    { id: 'drehkipp-links', name: 'Dreh-Kipp Links', image: '/nacrti/1_dkl.svg' },
    { id: 'drehkipp-rechts', name: 'Dreh-Kipp Rechts', image: '/nacrti/1_dkr.svg' },
    { id: 'kipp', name: 'Kipp', image: '/nacrti/1_kipp.svg' },
  ]

  const verglasungen = [
    { id: '3fach-07', name: '3-fach Verglasung', ug: 'Ug 0,7', image: '/staklo/waermeschutzisolierverglasung-3fach.avif' },
    { id: '3fach-06', name: '3-fach Verglasung', ug: 'Ug 0,6', image: '/staklo/waermeschutzisolierverglasung-3fach-1.avif' },
  ]

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const WindowDrawing = () => {
    const drawPanels = () => {
      if (config.fenstertyp === 'einteilig') {
        return (
          <g>
            <rect x="50" y="30" width="200" height="240" fill="#e3f2fd" stroke="#1565c0" strokeWidth="3" />
            <rect x="60" y="40" width="180" height="220" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
            <line x1="150" y1="40" x2="150" y2="260" stroke="#1565c0" strokeWidth="1" />
            <line x1="60" y1="150" x2="240" y2="150" stroke="#1565c0" strokeWidth="1" />
            {(config.oeffnungsart === 'drehkipp-links' || config.oeffnungsart === 'drehkipp-rechts') && (
              <>
                <line x1="60" y1="260" x2="150" y2="150" stroke="#1565c0" strokeWidth="1.5" />
                <line x1="240" y1="260" x2="150" y2="150" stroke="#1565c0" strokeWidth="1.5" />
                <line x1="150" y1="40" x2="150" y2="150" stroke="#1565c0" strokeWidth="1.5" strokeDasharray="5,5" />
              </>
            )}
            {config.oeffnungsart === 'kipp' && (
              <line x1="150" y1="40" x2="150" y2="150" stroke="#1565c0" strokeWidth="1.5" />
            )}
          </g>
        )
      }
      
      if (config.fenstertyp === 'zweiteilig') {
        return (
          <g>
            <rect x="50" y="30" width="200" height="240" fill="#e3f2fd" stroke="#1565c0" strokeWidth="3" />
            <rect x="60" y="40" width="85" height="220" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
            <rect x="155" y="40" width="85" height="220" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
            <line x1="102" y1="40" x2="102" y2="260" stroke="#1565c0" strokeWidth="1" />
            <line x1="60" y1="150" x2="145" y2="150" stroke="#1565c0" strokeWidth="1" />
            <line x1="197" y1="40" x2="197" y2="260" stroke="#1565c0" strokeWidth="1" />
            <line x1="155" y1="150" x2="240" y2="150" stroke="#1565c0" strokeWidth="1" />
            {(config.oeffnungsart === 'drehkipp-links' || config.oeffnungsart === 'drehkipp-rechts' || config.oeffnungsart === 'kipp') && (
              <>
                <line x1="60" y1="260" x2="102" y2="150" stroke="#1565c0" strokeWidth="1.5" />
                <line x1="145" y1="260" x2="102" y2="150" stroke="#1565c0" strokeWidth="1.5" />
                <line x1="155" y1="260" x2="197" y2="150" stroke="#1565c0" strokeWidth="1.5" />
                <line x1="240" y1="260" x2="197" y2="150" stroke="#1565c0" strokeWidth="1.5" />
              </>
            )}
          </g>
        )
      }
      
      if (config.fenstertyp === 'dreiteilig') {
        return (
          <g>
            <rect x="50" y="30" width="200" height="240" fill="#e3f2fd" stroke="#1565c0" strokeWidth="3" />
            <rect x="60" y="40" width="55" height="220" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
            <rect x="122" y="40" width="56" height="220" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
            <rect x="185" y="40" width="55" height="220" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
            <line x1="87" y1="40" x2="87" y2="260" stroke="#1565c0" strokeWidth="1" />
            <line x1="150" y1="40" x2="150" y2="260" stroke="#1565c0" strokeWidth="1" />
            <line x1="212" y1="40" x2="212" y2="260" stroke="#1565c0" strokeWidth="1" />
            <line x1="60" y1="150" x2="115" y2="150" stroke="#1565c0" strokeWidth="1" />
            <line x1="122" y1="150" x2="178" y2="150" stroke="#1565c0" strokeWidth="1" />
            <line x1="185" y1="150" x2="240" y2="150" stroke="#1565c0" strokeWidth="1" />
          </g>
        )
      }

      return (
        <g>
          <rect x="50" y="30" width="200" height="240" fill="#e3f2fd" stroke="#1565c0" strokeWidth="3" />
          <rect x="60" y="40" width="180" height="220" fill="#bbdefb" stroke="#1565c0" strokeWidth="2" />
          <line x1="150" y1="40" x2="150" y2="260" stroke="#1565c0" strokeWidth="1" />
          <line x1="60" y1="150" x2="240" y2="150" stroke="#1565c0" strokeWidth="1" />
        </g>
      )
    }

    return (
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {drawPanels()}
      </svg>
    )
  }

  return (
    <>
      <Head>
        <title>Fenster Konfigurator - {productNames[product] || 'Revolux'}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-900">Startseite</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">Produkt Konfigurator</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Title & Steps */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Konfigurieren Sie Ihr Fenster</h1>
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentStep(1)}
                className={`flex items-center gap-2 px-6 py-2 rounded-l-full border-2 ${
                  currentStep === 1 
                    ? 'bg-slate-700 text-white border-slate-700' 
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                <Check className="w-4 h-4" />
                Schritt 1
              </button>
              <button 
                onClick={() => setCurrentStep(2)}
                className={`flex items-center gap-2 px-6 py-2 rounded-r-full border-2 border-l-0 ${
                  currentStep === 2 
                    ? 'bg-slate-700 text-white border-slate-700' 
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                <Check className="w-4 h-4" />
                Schritt 2
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - Preview & Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm border sticky top-4">
                <div className="bg-slate-700 text-white px-4 py-2 rounded-t-lg text-sm">
                  Ihre Konfiguration <span className="text-slate-300">Innenansicht</span>
                </div>
                
                {/* Window Preview */}
                <div className="p-6 border-b">
                  <div className="aspect-square bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                    <WindowDrawing />
                  </div>
                </div>

                {/* Collapsible Sections */}
                <div>
                  <button 
                    onClick={() => toggleSection('profil')}
                    className="w-full flex items-center justify-between p-4 bg-slate-700 text-white"
                  >
                    <span className="font-medium">1. Profil, Typ, Maße</span>
                    {expandedSections.profil ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSections.profil && (
                    <div className="divide-y text-sm">
                      <div className="flex justify-between p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">System:</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          Aluplast
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex justify-between p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">Profil:</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          {profile.find(p => p.id === config.profil)?.name}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex justify-between p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">Farbe und Dekore:</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          {farben.find(f => f.id === config.farbe)?.name}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex justify-between p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">Fenstertyp:</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          {fenstertypen.find(f => f.id === config.fenstertyp)?.name}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex justify-between p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">Öffnungsart:</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          {oeffnungsarten.find(o => o.id === config.oeffnungsart)?.name}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex justify-between p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">Größe:</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          {config.breite} x {config.hoehe} mm
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => toggleSection('glas')}
                    className="w-full flex items-center justify-between p-4 bg-slate-700 text-white"
                  >
                    <span className="font-medium">2. Glas, Zubehör <span className="text-slate-400">(optional)</span></span>
                    {expandedSections.glas ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSections.glas && (
                    <div className="divide-y text-sm">
                      <div className="flex justify-between p-3 hover:bg-gray-50 cursor-pointer">
                        <span className="font-medium">Verglasung:</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          {verglasungen.find(v => v.id === config.verglasung)?.ug}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Configuration Options */}
            <div className="lg:col-span-8 space-y-6">
              {currentStep === 1 && (
                <>
                  {/* PROFIL */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">PROFIL</span>
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-300 cursor-pointer hover:text-white">mehr Details</span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Bitte wählen Sie das gewünschte Profil aus.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {profile.map((prof) => (
                          <button
                            key={prof.id}
                            onClick={() => setConfig({ ...config, profil: prof.id })}
                            className={`relative border-2 rounded-lg p-3 text-left transition-all ${
                              config.profil === prof.id 
                                ? 'border-blue-900' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {config.profil === prof.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-900 rounded flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                              Uw-Wert ≥ {prof.uw}
                            </span>
                            <div className="aspect-square relative mb-2 mt-6">
                              <Image 
                                src={prof.image} 
                                alt={prof.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <p className="font-bold text-sm">{prof.name}</p>
                            <ul className="mt-2 space-y-1">
                              {prof.features.map((feat, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                                  <Check className="w-3 h-3 text-blue-900" />
                                  {feat}
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-blue-900 mt-2 hover:underline">Profil ansehen</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* FARBE UND DEKORE */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">FARBE UND DEKORE</span>
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-300 cursor-pointer hover:text-white">mehr Details</span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Bitte wählen Sie die gewünschte Farbe oder das gewünschte Dekor aus.
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {farben.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setConfig({ ...config, farbe: f.id })}
                            className={`relative border-2 rounded-lg p-2 transition-all ${
                              config.farbe === f.id 
                                ? 'border-blue-900' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {config.farbe === f.id && (
                              <div className="absolute top-1 right-1 w-4 h-4 bg-blue-900 rounded flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                            <div 
                              className="aspect-square rounded mb-2 border"
                              style={{ backgroundColor: f.color }}
                            />
                            <p className="text-[10px] font-medium text-center leading-tight">{f.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* FENSTERTYP */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">FENSTERTYP</span>
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-300 cursor-pointer hover:text-white">mehr Details</span>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {fenstertypen.map((typ) => (
                          <button
                            key={typ.id}
                            onClick={() => setConfig({ ...config, fenstertyp: typ.id })}
                            className={`relative border-2 rounded-lg p-3 transition-all ${
                              config.fenstertyp === typ.id 
                                ? 'border-blue-900 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {config.fenstertyp === typ.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-900 rounded flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="h-28 flex items-center justify-center mb-2">
                              <img 
                                src={typ.image} 
                                alt={typ.name}
                                className="h-full w-auto object-contain"
                              />
                            </div>
                            <p className="text-sm font-medium text-center">{typ.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ÖFFNUNGSART */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">ÖFFNUNGSART</span>
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-300 cursor-pointer hover:text-white">mehr Details</span>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {oeffnungsarten.map((art) => (
                          <button
                            key={art.id}
                            onClick={() => setConfig({ ...config, oeffnungsart: art.id })}
                            className={`relative border-2 rounded-lg p-3 transition-all ${
                              config.oeffnungsart === art.id 
                                ? 'border-blue-900 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {config.oeffnungsart === art.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-900 rounded flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="h-28 flex items-center justify-center mb-2">
                              {art.image ? (
                                <img 
                                  src={art.image} 
                                  alt={art.name}
                                  className="h-full w-auto object-contain"
                                />
                              ) : (
                                <div className="w-16 h-24 border-2 border-gray-400 rounded flex items-center justify-center bg-white">
                                  <div className="relative w-8 h-8">
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 -translate-y-1/2" />
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 -translate-x-1/2" />
                                  </div>
                                </div>
                              )}
                            </div>
                            <p className="text-sm font-medium text-center">{art.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* GRÖßE */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">GRÖßE</span>
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-300 cursor-pointer hover:text-white">mehr Details</span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Bitte geben Sie die gewünschte Größe inkl. aller Anbauteile in Millimeter ein
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gesamtbreite (mm)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={config.breite}
                              onChange={(e) => setConfig({ ...config, breite: parseInt(e.target.value) || 0 })}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:border-blue-800 focus:outline-none"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">mm</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">min. 385 mm</span>
                            <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">max. 3010 mm</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gesamthöhe (mm)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={config.hoehe}
                              onChange={(e) => setConfig({ ...config, hoehe: parseInt(e.target.value) || 0 })}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:border-blue-800 focus:outline-none"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">mm</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">min. 385 mm</span>
                            <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">max. 3010 mm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* VERGLASUNG */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">VERGLASUNG</span>
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-300 cursor-pointer hover:text-white">mehr Details</span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Isolierverglasung nach ÖNORM EN 673
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {verglasungen.map((glas) => (
                          <button
                            key={glas.id}
                            onClick={() => setConfig({ ...config, verglasung: glas.id })}
                            className={`relative border-2 rounded-lg p-4 transition-all ${
                              config.verglasung === glas.id 
                                ? 'border-blue-900 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {config.verglasung === glas.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-900 rounded flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <div className="h-32 flex items-center justify-center mb-3">
                              <img 
                                src={glas.image} 
                                alt={glas.name}
                                className="h-full w-auto object-contain"
                              />
                            </div>
                            <p className="font-bold text-base text-center">{glas.ug}</p>
                            <p className="text-sm text-gray-500 text-center">{glas.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Yes/No Options */}
                  {[
                    { id: 'randverbund', label: 'THERMISCHER RANDVERBUND', desc: 'Thermisch getrennter Randverbund (warme Kante)' },
                    { id: 'schallschutz', label: 'SCHALLSCHUTZVERGLASUNG', desc: '' },
                    { id: 'sicherheit', label: 'SICHERHEITSVERGLASUNG', desc: '' },
                  ].map((option) => (
                    <div key={option.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                      <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.label}</span>
                          <HelpCircle className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-sm text-slate-300 cursor-pointer hover:text-white">mehr Details</span>
                      </div>
                      <div className="p-4">
                        {option.desc && <p className="text-sm text-gray-600 mb-4">{option.desc}</p>}
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setConfig({ ...config, [option.id]: 'nein' })}
                            className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
                              config[option.id] === 'nein' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              config[option.id] === 'nein' ? 'border-blue-900 bg-blue-900' : 'border-gray-300'
                            }`}>
                              {config[option.id] === 'nein' && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="font-medium">Nein</span>
                            {config[option.id] === 'nein' && (
                              <Check className="w-5 h-5 text-blue-900 ml-auto" />
                            )}
                          </button>
                          <button
                            onClick={() => setConfig({ ...config, [option.id]: 'ja' })}
                            className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
                              config[option.id] === 'ja' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              config[option.id] === 'ja' ? 'border-blue-900 bg-blue-900' : 'border-gray-300'
                            }`}>
                              {config[option.id] === 'ja' && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="font-medium">Ja</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center py-4">
                {currentStep > 1 ? (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-full font-medium hover:border-gray-400"
                  >
                    Zurück
                  </button>
                ) : (
                  <div />
                )}
                
                {currentStep < 2 ? (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3 bg-blue-900 hover:bg-blue-700 text-white rounded-full font-medium"
                  >
                    Weiter zu Schritt 2
                  </button>
                ) : (
                  <button
                    className="px-8 py-3 bg-blue-900 hover:bg-blue-700 text-white rounded-full font-medium"
                  >
                    Anfrage senden
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
