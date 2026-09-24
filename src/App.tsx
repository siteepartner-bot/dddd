/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { CourseRegistration } from './components/CourseRegistration';
import { TuitionPayment } from './components/TuitionPayment';
import { WeeklySchedule } from './components/WeeklySchedule';
import { ExamSchedule } from './components/ExamSchedule';
import { TranscriptView } from './components/TranscriptView';
import { AdminImportView } from './components/AdminImportView';
import { BankGatewayModal } from './components/BankGatewayModal';
import { ReceiptModal } from './components/ReceiptModal';
import { LoginModal } from './components/LoginModal';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 min-h-[calc(100vh-280px)]">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'registration' && <CourseRegistration />}
      {activeTab === 'tuition' && <TuitionPayment />}
      {activeTab === 'schedule' && <WeeklySchedule />}
      {activeTab === 'exams' && <ExamSchedule />}
      {activeTab === 'transcript' && <TranscriptView />}
      {activeTab === 'admin' && <AdminImportView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-teal-600 selection:text-white" dir="rtl">
        <div>
          <Header />
          <MainContent />
        </div>
        <div>
          <Footer />
          <BottomNav />
        </div>

        {/* Global Dialogs and Portals */}
        <BankGatewayModal />
        <ReceiptModal />
        <LoginModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
