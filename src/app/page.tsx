'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  grade: number;
  units: number;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: 0, units: 0 },
  ]);
  const [oldPoints, setOldPoints] = useState<number | ''>('');
  const [oldTNU, setOldTNU] = useState<number | ''>('');
  const [cgpa, setCgpa] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), name: '', grade: 0, units: 0 }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculateCGPA = () => {
    const currentPoints = courses.reduce((acc, curr) => acc + (curr.grade * curr.units), 0);
    const currentUnits = courses.reduce((acc, curr) => acc + Number(curr.units), 0);

    const prevPoints = Number(oldPoints) || 0;
    const prevTNU = Number(oldTNU) || 0;

    const totalPoints = prevPoints + currentPoints;
    const totalUnits = prevTNU + currentUnits;

    if (totalUnits === 0) {
      setCgpa(0);
      return;
    }

    setCgpa(totalPoints / totalUnits);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30 selection:text-purple-200 font-sans">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <header className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl mb-4 ring-1 ring-purple-500/20 backdrop-blur-xl">
            <GraduationCap className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
            CGPA Calculator
          </h1>
          <p className="text-neutral-400 text-lg max-w-lg mx-auto">
            Effortlessly calculate your Cumulative Grade Point Average with precision.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Previous Data Section */}
          <section className="bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:border-purple-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-200">Previous Academic Data</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-neutral-400 group-focus-within:text-blue-400 transition-colors">
                  Previous Total Quality Points
                </label>
                <input
                  type="number"
                  value={oldPoints}
                  onChange={(e) => setOldPoints(Number(e.target.value))}
                  placeholder="e.g., 150"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-neutral-400 group-focus-within:text-blue-400 transition-colors">
                  Previous Total Units (TNU)
                </label>
                <input
                  type="number"
                  value={oldTNU}
                  onChange={(e) => setOldTNU(Number(e.target.value))}
                  placeholder="e.g., 30"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </section>

          {/* Result Section (Preview) */}
          <section className="relative group overflow-hidden bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-all duration-700"></div>

            <div className="relative z-10 space-y-2">
              <div className="text-sm font-semibold tracking-wider text-purple-400 uppercase">Your CGPA</div>
              <div className={`text-7xl font-bold tabular-nums tracking-tighter ${cgpa !== null ? 'text-white' : 'text-neutral-700'}`}>
                {cgpa !== null ? cgpa.toFixed(2) : '0.00'}
              </div>
              {cgpa !== null && (
                <div className="text-neutral-400 pt-2">
                  Based on existing input logic
                </div>
              )}
            </div>

            {cgpa === null && (
              <div className="absolute  bottom-8 text-xs text-neutral-600">
                Enter details to calculate
              </div>
            )}
          </section>
        </div>

        {/* Current Semester Courses */}
        <section className="mt-8 bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Calculator className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-200">Current Semester Courses</h2>
            </div>

            <button
              onClick={addCourse}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="group grid grid-cols-12 gap-4 items-center p-4 bg-black/20 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300"
              >
                <div className="col-span-1 text-neutral-600 font-mono text-sm pl-2">
                  {(index + 1).toString().padStart(2, '0')}
                </div>

                <div className="col-span-5 md:col-span-6">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="Course Name"
                    className="w-full bg-transparent border-none p-0 text-white placeholder:text-neutral-700 focus:ring-0 text-base font-medium"
                  />
                </div>

                <div className="col-span-2 md:col-span-2">
                  <input
                    type="number"
                    value={course.grade || ''}
                    onChange={(e) => updateCourse(course.id, 'grade', Number(e.target.value))}
                    placeholder="Pt"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-center text-white placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>

                <div className="col-span-2 md:col-span-2">
                  <input
                    type="number"
                    value={course.units || ''}
                    onChange={(e) => updateCourse(course.id, 'units', Number(e.target.value))}
                    placeholder="Unit"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-center text-white placeholder:text-neutral-700 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>

                <div className="col-span-2 md:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="p-2 text-neutral-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={calculateCGPA}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Calculate Results
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
