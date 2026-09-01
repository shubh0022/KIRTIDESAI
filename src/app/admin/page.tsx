'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Download, RefreshCw, CheckCircle2, FileText, Image as ImageIcon, Settings } from 'lucide-react';
import { projects as initialProjects } from '@/data/projects';
import { siteSettings as initialSiteSettings } from '@/data/siteContent';
import TechnicalStamp from '@/components/ui/TechnicalStamp';

export default function AdminPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'export'>('projects');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleProjectFieldChange = (field: string, value: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === selectedProjectId ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDownloadJSON = () => {
    const data = {
      siteSettings,
      projects,
      exportTimestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kirti-desai-atelier-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="pb-6 mb-8 border-b border-[#161616]/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#161616]/70 hover:text-[#A95F45] uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO STUDIO</span>
          </Link>
          <span className="text-[#161616]/20">|</span>
          <TechnicalStamp label="CMS" value="ATELIER CONTROL CENTER" variant="clay" />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 font-mono text-xs tracking-widest uppercase border transition-colors cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#161616] text-[#FAF7F2] border-[#161616]'
                : 'bg-[#FAF7F2] text-[#161616] border-[#161616]/20 hover:border-[#A95F45]'
            }`}
          >
            PROJECTS
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 font-mono text-xs tracking-widest uppercase border transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#161616] text-[#FAF7F2] border-[#161616]'
                : 'bg-[#FAF7F2] text-[#161616] border-[#161616]/20 hover:border-[#A95F45]'
            }`}
          >
            PROFILE
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-3 py-1.5 font-mono text-xs tracking-widest uppercase border transition-colors cursor-pointer ${
              activeTab === 'export'
                ? 'bg-[#161616] text-[#FAF7F2] border-[#161616]'
                : 'bg-[#FAF7F2] text-[#161616] border-[#161616]/20 hover:border-[#A95F45]'
            }`}
          >
            JSON EXPORT
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 bg-[#A95F45]/15 border border-[#A95F45] text-[#161616] flex items-center gap-2 font-mono text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#A95F45]" />
          <span>Atelier changes saved to local session state successfully.</span>
        </div>
      )}

      {/* Projects Editor Tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Project List Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-[10px] text-[#161616]/50 uppercase tracking-widest block mb-2">
              PROJECT CATALOG ({projects.length})
            </span>
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`w-full text-left p-4 border transition-all cursor-pointer ${
                  selectedProjectId === p.id
                    ? 'bg-[#FAF7F2] border-[#A95F45] shadow-md ring-1 ring-[#A95F45]'
                    : 'bg-[#FAF7F2]/60 border-[#161616]/10 hover:border-[#161616]/30'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-[#A95F45] mb-1">
                  <span>PROJECT {p.projectNumber}</span>
                  <span>{p.date}</span>
                </div>
                <h4 className="font-editorial-serif text-lg text-[#161616] leading-tight">
                  {p.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Project Edit Form */}
          <div className="lg:col-span-8 bg-[#FAF7F2] p-6 sm:p-8 border border-[#161616]/15 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#161616]/10">
              <h3 className="font-editorial-serif text-2xl text-[#161616]">
                Edit: {selectedProject.title}
              </h3>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#A95F45] hover:bg-[#884E33] text-[#FAF7F2] font-mono text-xs uppercase tracking-widest cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>SAVE CHANGES</span>
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div>
                <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  PROJECT TITLE
                </label>
                <input
                  type="text"
                  value={selectedProject.title}
                  onChange={(e) => handleProjectFieldChange('title', e.target.value)}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 text-sm font-editorial-serif"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  SUBTITLE / CONCEPT
                </label>
                <input
                  type="text"
                  value={selectedProject.subtitle || ''}
                  onChange={(e) => handleProjectFieldChange('subtitle', e.target.value)}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 text-sm font-editorial-serif"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  SUMMARY & NARRATIVE
                </label>
                <textarea
                  rows={4}
                  value={selectedProject.summary}
                  onChange={(e) => handleProjectFieldChange('summary', e.target.value)}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 text-xs font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  PROJECT BRIEF & CHALLENGE
                </label>
                <textarea
                  rows={3}
                  value={selectedProject.brief || ''}
                  onChange={(e) => handleProjectFieldChange('brief', e.target.value)}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 text-xs font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  RESEARCH & ARCHIVAL STUDY
                </label>
                <textarea
                  rows={3}
                  value={selectedProject.research || ''}
                  onChange={(e) => handleProjectFieldChange('research', e.target.value)}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 text-xs font-sans leading-relaxed"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  FINAL RESULT & REFLECTION
                </label>
                <textarea
                  rows={3}
                  value={selectedProject.reflection || ''}
                  onChange={(e) => handleProjectFieldChange('reflection', e.target.value)}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 text-xs font-sans leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Settings Tab */}
      {activeTab === 'profile' && (
        <div className="bg-[#FAF7F2] p-8 border border-[#161616]/15 max-w-3xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#161616]/10">
            <h3 className="font-editorial-serif text-2xl text-[#161616]">
              Designer Profile & Contact Settings
            </h3>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#A95F45] hover:bg-[#884E33] text-[#FAF7F2] font-mono text-xs uppercase tracking-widest cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE PROFILE</span>
            </button>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                DESIGNER FULL NAME
              </label>
              <input
                type="text"
                value={siteSettings.name}
                onChange={(e) => setSiteSettings({ ...siteSettings, name: e.target.value })}
                className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 font-semibold text-sm"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                POSITIONING STATEMENT / TAGLINE
              </label>
              <input
                type="text"
                value={siteSettings.positioningStatement}
                onChange={(e) => setSiteSettings({ ...siteSettings, positioningStatement: e.target.value })}
                className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5 text-sm italic font-editorial-serif"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  value={siteSettings.phone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  className="w-full bg-[#F4F0E8] border border-[#161616]/15 p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#161616]/60 uppercase tracking-widest block mb-1">
                ACADEMIC AFFILIATION & PERIOD
              </label>
              <input
                type="text"
                value={`${siteSettings.academicInstitute} (${siteSettings.academicPeriod})`}
                disabled
                className="w-full bg-[#E5D8C8]/30 border border-[#161616]/10 p-2.5 text-[#161616]/70 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      )}

      {/* JSON Export Tab */}
      {activeTab === 'export' && (
        <div className="bg-[#FAF7F2] p-8 border border-[#161616]/15 max-w-3xl space-y-6">
          <div>
            <h3 className="font-editorial-serif text-2xl text-[#161616]">
              Atelier JSON Data Export
            </h3>
            <p className="font-sans text-xs text-[#4A4A4A] mt-1 font-light">
              Export the current projects, craft studies, and designer settings as an archival JSON file for backups or headless distribution.
            </p>
          </div>

          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#161616] hover:bg-[#A95F45] text-[#FAF7F2] font-mono text-xs tracking-widest uppercase transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD ATELIER BACKUP (.JSON)</span>
          </button>
        </div>
      )}
    </div>
  );
}
