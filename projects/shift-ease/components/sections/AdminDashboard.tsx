'use client';

import { useState } from 'react';
import { companies as initialCompanies } from '@/lib/data';
import type { Company } from '@/lib/data';
import { Building2, ShieldCheck, Clock, CheckCircle2, XCircle, FileText, Users, DollarSign, Search } from 'lucide-react';

interface MockLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  fromCity: string;
  toCity: string;
  homeSize: string;
  date: string;
  status: 'new' | 'contacted' | 'assigned';
}

const initialLeads: MockLead[] = [
  {
    id: 'LD-101',
    name: 'Rohan Sharma',
    phone: '+91 98112 33445',
    email: 'rohan.s@gmail.com',
    fromCity: 'Delhi',
    toCity: 'Mumbai',
    homeSize: '2 BHK',
    date: '2026-08-05',
    status: 'new',
  },
  {
    id: 'LD-102',
    name: 'Priya Iyer',
    phone: '+91 99401 88231',
    email: 'priya.iyer@yahoo.com',
    fromCity: 'Bangalore',
    toCity: 'Bangalore',
    homeSize: '3 BHK',
    date: '2026-08-10',
    status: 'contacted',
  },
  {
    id: 'LD-103',
    name: 'Karan Patel',
    phone: '+91 97234 11009',
    email: 'karan.patel@outlook.com',
    fromCity: 'Mumbai',
    toCity: 'Pune',
    homeSize: '1 BHK',
    date: '2026-08-08',
    status: 'assigned',
  },
];

export default function AdminDashboard() {
  const [vendorList, setVendorList] = useState<Company[]>(initialCompanies);
  const [leadsList, setLeadsList] = useState<MockLead[]>(initialLeads);
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'leads' | 'companies'>('overview');
  const [filterSearch, setFilterSearch] = useState('');

  // Sample pending vendors for demo
  const pendingVendors: Company[] = [
    {
      id: 'p1',
      slug: 'ncr-fast-express-movers',
      name: 'NCR Fast Express Movers',
      ownerName: 'Sunil Verma',
      gstin: '07BBBBB1111A1Z9',
      cityId: '1',
      cityName: 'Delhi',
      address: 'Sector 62, Noida, Delhi NCR',
      phone: '+91 98100 99887',
      email: 'contact@ncrfastexpress.in',
      website: 'https://ncrfastexpress.in',
      yearsInBusiness: 4,
      services: ['House Shifting', 'Office Relocation', 'Car Transportation'],
      logoUrl: '',
      coverUrl: '',
      isVerified: false,
      status: 'pending',
      rating: 4.5,
      reviewCount: 12,
      createdAt: '2026-07-30',
    },
  ];

  const handleApproveVendor = (id: string) => {
    setVendorList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved', isVerified: true } : c))
    );
  };

  const handleRejectVendor = (id: string) => {
    setVendorList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' } : c))
    );
  };

  const approvedCount = vendorList.filter((c) => c.status === 'approved').length;

  const filteredCompanies = vendorList.filter((c) =>
    c.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
    c.cityName.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Metric Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate uppercase tracking-wider">Total Listings</span>
            <div className="text-3xl font-display font-extrabold text-navy mt-1">{vendorList.length}</div>
            <span className="text-xs text-teal font-medium mt-1 block">Active across 3 metros</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate uppercase tracking-wider">Verified Partners</span>
            <div className="text-3xl font-display font-extrabold text-navy mt-1">{approvedCount}</div>
            <span className="text-xs text-teal font-medium mt-1 block">100% GST Audited</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate uppercase tracking-wider">Active Leads</span>
            <div className="text-3xl font-display font-extrabold text-navy mt-1">{leadsList.length}</div>
            <span className="text-xs text-teal font-medium mt-1 block">Quotes requested today</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate uppercase tracking-wider">Pending Approvals</span>
            <div className="text-3xl font-display font-extrabold text-navy mt-1">{pendingVendors.length}</div>
            <span className="text-xs text-amber-600 font-medium mt-1 block">Needs GST verification</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${
            activeTab === 'overview' ? 'bg-navy text-white shadow-md' : 'text-slate hover:bg-lightGray'
          }`}
        >
          Overview & Quick Stats
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'approvals' ? 'bg-navy text-white shadow-md' : 'text-slate hover:bg-lightGray'
          }`}
        >
          Partner Approvals
          <span className="badge bg-teal text-white text-[10px]">{pendingVendors.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'leads' ? 'bg-navy text-white shadow-md' : 'text-slate hover:bg-lightGray'
          }`}
        >
          Customer Leads ({leadsList.length})
        </button>
        <button
          onClick={() => setActiveTab('companies')}
          className={`px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${
            activeTab === 'companies' ? 'bg-navy text-white shadow-md' : 'text-slate hover:bg-lightGray'
          }`}
        >
          Directory Management ({vendorList.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="heading-md font-display text-navy border-b border-gray-100 pb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal" /> Pending Vendor Applications
            </h3>
            {pendingVendors.map((vendor) => (
              <div key={vendor.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-navy text-base">{vendor.name}</h4>
                  <p className="text-xs text-slate mt-0.5">{vendor.cityName} · GSTIN: {vendor.gstin}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button onClick={() => handleApproveVendor(vendor.id)} className="btn-primary text-xs py-2 px-3 flex-1 sm:flex-none">
                    Approve
                  </button>
                  <button onClick={() => handleRejectVendor(vendor.id)} className="btn-outline text-xs py-2 px-3 flex-1 sm:flex-none">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="heading-md font-display text-navy border-b border-gray-100 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal" /> Recent Customer Quote Requests
            </h3>
            <div className="space-y-3">
              {leadsList.map((lead) => (
                <div key={lead.id} className="p-3.5 rounded-xl bg-lightGray flex items-center justify-between text-sm">
                  <div>
                    <span className="font-bold text-navy block">{lead.name} ({lead.homeSize})</span>
                    <span className="text-xs text-slate">{lead.fromCity} → {lead.toCity} · {lead.date}</span>
                  </div>
                  <span className="badge bg-teal/10 text-teal text-xs font-semibold">{lead.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Approvals */}
      {activeTab === 'approvals' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="heading-md font-display text-navy">Pending Partner Audits</h3>
          {pendingVendors.length === 0 ? (
            <p className="text-slate text-center py-8">All partner applications have been audited.</p>
          ) : (
            pendingVendors.map((vendor) => (
              <div key={vendor.id} className="p-6 rounded-2xl border border-gray-200 bg-lightGray/40 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-navy text-lg">{vendor.name}</h4>
                    <p className="text-sm text-slate">Owner: {vendor.ownerName} · Phone: {vendor.phone}</p>
                    <p className="text-xs font-mono text-teal mt-1">GSTIN: {vendor.gstin}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleApproveVendor(vendor.id)} className="btn-primary text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Approve Listing
                    </button>
                    <button onClick={() => handleRejectVendor(vendor.id)} className="btn-outline text-sm flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Leads */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="heading-md font-display text-navy">Customer Relocation Leads</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate">
              <thead className="bg-navy text-white text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Lead ID</th>
                  <th className="px-6 py-4 font-semibold">Customer Name</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Route</th>
                  <th className="px-6 py-4 font-semibold">Home Size</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leadsList.map((lead) => (
                  <tr key={lead.id} className="hover:bg-lightGray/50">
                    <td className="px-6 py-4 font-mono font-bold text-navy">{lead.id}</td>
                    <td className="px-6 py-4 font-semibold text-navy">{lead.name}</td>
                    <td className="px-6 py-4">{lead.phone}<br /><span className="text-xs text-slate">{lead.email}</span></td>
                    <td className="px-6 py-4">{lead.fromCity} → {lead.toCity}</td>
                    <td className="px-6 py-4">{lead.homeSize}</td>
                    <td className="px-6 py-4">
                      <span className="badge bg-teal/10 text-teal uppercase text-[10px] font-bold">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Companies */}
      {activeTab === 'companies' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <h3 className="heading-md font-display text-navy">All Listed Companies</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate w-4 h-4" />
              <input
                type="text"
                placeholder="Search listings..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate">
              <thead className="bg-navy text-white text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Company Name</th>
                  <th className="px-6 py-4 font-semibold">City</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Rating</th>
                  <th className="px-6 py-4 font-semibold">Reviews</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-lightGray/50">
                    <td className="px-6 py-4 font-bold text-navy">{company.name}</td>
                    <td className="px-6 py-4">{company.cityName}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${
                        company.status === 'approved' ? 'bg-teal/10 text-teal' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-navy">★ {company.rating}</td>
                    <td className="px-6 py-4">{company.reviewCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}