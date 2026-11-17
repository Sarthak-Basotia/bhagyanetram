import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  clearAdminSession,
  getAdminUser,
  fetchAdminStats,
  fetchAdminAstrologers,
  createAstrologerApi,
  updateAstrologerApi,
  deleteAstrologerApi,
  fetchAdminBlogs,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  fetchAdminQueries,
  updateQueryStatusApi,
  deleteQueryApi,
  fetchAdminUsers,
  updateUserApi,
  deleteUserApi,
  fetchAdminReviews,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
  changeAdminPasswordApi,
  fetchSubadminsApi,
  createSubadminApi,
  updateSubadminApi,
  deleteSubadminApi,
  fetchAdminLogsApi,
} from '../../../api/adminApi';
import {
  LayoutDashboard,
  Users,
  Sparkles,
  BookOpen,
  MessageSquare,
  Quote,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Mail,
  Calendar,
  Star,
  RefreshCw,
  ShieldAlert,
  Loader2,
  Award,
  Globe,
  Upload,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FileSpreadsheet,
  Image as ImageIcon,
  KeyRound,
  ShieldCheck,
  UserPlus,
  ChevronDown,
  UserCheck,
  UserX,
  Lock,
  EyeOff,
  History,
  ClipboardList,
  Activity,
  FileText
} from 'lucide-react';
import logoImage from 'figma:asset/d5457f2df4c5864ece0203437258a94768a0cf00.png';
import panditPranavImg from 'figma:asset/Pandit-Pranav_2.jpeg';
import gargiJiImg from 'figma:asset/Gargi_Ji.jpeg';
import nidhiJiImg from 'figma:asset/Nidhi-Ji.png';

const resolveAstrologerImage = (astro: any) => {
  if (!astro) return panditPranavImg;
  const img = astro.image;
  if (img && (img.startsWith('data:image/') || img.startsWith('http://') || img.startsWith('https://'))) {
    return img;
  }
  const name = (astro.name || '').toLowerCase();
  if (name.includes('gargi')) return gargiJiImg;
  if (name.includes('nidhi')) return nidhiJiImg;
  return panditPranavImg;
};

const DEFAULT_WEBSITE_BLOG = {
  _id: '6afb376729d606686da70e00',
  id: '6afb376729d606686da70e00',
  title: 'Vastu for the Main Entrance: Attracting Positive Energy with Stones and Shells',
  slug: 'vastu-for-the-main-entrance',
  category: 'Vastu Shastra',
  excerpt: 'The main entrance of a home or office is more than just a doorway — in Vastu Shastra, it is considered the "mukhya dwar," the mouth through which all energy, opportunity, and prosperity enters a space.',
  author: 'Bhagya Netram',
  image: 'blog1.jpeg',
  date: 'September 27, 2026',
  createdAt: '2026-09-27T00:00:00.000Z',
  published: true,
  views: 420,
  tags: ['Vastu Shastra', 'Main Entrance', 'Gomti Chakra', 'Home Remedies'],
};

// ==========================================
// CSV EXPORT UTILITY (RFC 4180 + UTF-8 BOM)
// ==========================================
const exportToCSV = (filename: string, headers: string[], rows: (string | number | undefined | null)[][]) => {
  const sanitize = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvContent = [
    headers.map(sanitize).join(','),
    ...rows.map((row) => row.map(sanitize).join(',')),
  ].join('\r\n');

  // Prepend UTF-8 BOM (\uFEFF) so Excel/Numbers automatically parses UTF-8 correctly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ==========================================
// DATE FILTER UTILITY & MATCHING LOGIC
// ==========================================
const matchesDateFilter = (
  rawDate: any,
  datePreset: string,
  startDate?: string,
  endDate?: string
): boolean => {
  if (!datePreset || datePreset === 'all') {
    if (!startDate && !endDate) return true;
  }

  if (!rawDate) return false;
  const d = new Date(rawDate);
  if (isNaN(d.getTime())) return false;

  const now = new Date();

  if (datePreset === 'today') {
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return d >= startOfToday && d <= endOfToday;
  }

  if (datePreset === 'yesterday') {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const startOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0, 0);
    const endOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
    return d >= startOfYesterday && d <= endOfYesterday;
  }

  if (datePreset === 'last7') {
    const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0, 0);
    return d >= sevenDaysAgo && d <= now;
  }

  if (datePreset === 'last30') {
    const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30, 0, 0, 0, 0);
    return d >= thirtyDaysAgo && d <= now;
  }

  if (datePreset === 'thisMonth') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return d >= startOfMonth && d <= endOfMonth;
  }

  // Custom or manual date range bounds
  if (startDate) {
    const s = new Date(startDate + 'T00:00:00');
    if (!isNaN(s.getTime()) && d < s) return false;
  }
  if (endDate) {
    const e = new Date(endDate + 'T23:59:59.999');
    if (!isNaN(e.getTime()) && d > e) return false;
  }

  return true;
};

// Reusable Date Filter UI Bar
const TableDateFilter = ({
  preset,
  setPreset,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  compact = false,
}: {
  preset: string;
  setPreset: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  compact?: boolean;
}) => {
  const isFiltered = preset !== 'all' || Boolean(startDate) || Boolean(endDate);

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${compact ? 'text-[11px]' : 'text-xs'}`}>
      <div className="relative">
        <Calendar className="w-3.5 h-3.5 text-gold-500/70 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={preset}
          onChange={(e) => {
            const val = e.target.value;
            setPreset(val);
            if (val !== 'custom') {
              setStartDate('');
              setEndDate('');
            }
          }}
          className={`pl-8 pr-2.5 py-1.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white font-medium focus:outline-none focus:border-gold-400 cursor-pointer ${
            preset !== 'all' ? 'border-gold-500 text-gold-300 font-semibold' : ''
          }`}
        >
          <option value="all">📅 All Dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="custom">Custom Range...</option>
        </select>
      </div>

      {preset === 'custom' && (
        <div className="flex items-center gap-1 bg-cosmic-950 px-2.5 py-1 rounded-xl border border-gold-500/30">
          <span className="text-[10px] text-gold-400 font-semibold uppercase">From</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent text-white text-xs focus:outline-none [color-scheme:dark]"
            title="Filter from date"
          />
          <span className="text-[10px] text-gold-400 font-semibold uppercase ml-1">To</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent text-white text-xs focus:outline-none [color-scheme:dark]"
            title="Filter to date"
          />
        </div>
      )}

      {isFiltered && (
        <button
          onClick={() => {
            setPreset('all');
            setStartDate('');
            setEndDate('');
          }}
          className="p-1 rounded-lg text-gold-400 hover:text-white hover:bg-cosmic-800 transition cursor-pointer"
          title="Reset Date Filter"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

type ActiveTab = 'overview' | 'astrologers' | 'blogs' | 'queries' | 'users' | 'reviews' | 'subadmins' | 'logs';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = getAdminUser() || { name: 'Master Administrator', email: 'admin@bhagyanetram.com' };

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [stats, setStats] = useState<any>({
    totalAstrologers: 3,
    activeAstrologers: 3,
    totalBlogs: 1,
    totalQueries: 0,
    pendingQueries: 0,
    resolvedQueries: 0,
    totalUsers: 0,
    totalReviews: 3,
  });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [astrologers, setAstrologers] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([DEFAULT_WEBSITE_BLOG]);
  const [queries, setQueries] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  // Search & Filter states
  const [queryStatusFilter, setQueryStatusFilter] = useState('all');
  const [queryServiceFilter, setQueryServiceFilter] = useState('all');
  const [querySearch, setQuerySearch] = useState('');
  const [queryDatePreset, setQueryDatePreset] = useState('all');
  const [queryStartDate, setQueryStartDate] = useState('');
  const [queryEndDate, setQueryEndDate] = useState('');
  const [querySortField, setQuerySortField] = useState<'createdAt' | 'name' | 'services' | 'status'>('createdAt');
  const [querySortOrder, setQuerySortOrder] = useState<'asc' | 'desc'>('desc');

  // Overview Table Filters & Sort
  const [overviewStatusFilter, setOverviewStatusFilter] = useState('all');
  const [overviewDatePreset, setOverviewDatePreset] = useState('all');
  const [overviewStartDate, setOverviewStartDate] = useState('');
  const [overviewEndDate, setOverviewEndDate] = useState('');
  const [overviewSortField, setOverviewSortField] = useState<'createdAt' | 'name' | 'services' | 'status'>('createdAt');
  const [overviewSortOrder, setOverviewSortOrder] = useState<'asc' | 'desc'>('desc');

  // Users Filters & Sort
  const [userSearch, setUserSearch] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [userCreditsFilter, setUserCreditsFilter] = useState('all');
  const [userDatePreset, setUserDatePreset] = useState('all');
  const [userStartDate, setUserStartDate] = useState('');
  const [userEndDate, setUserEndDate] = useState('');
  const [userSortField, setUserSortField] = useState<'createdAt' | 'name' | 'palmistryCredits' | 'status'>('createdAt');
  const [userSortOrder, setUserSortOrder] = useState<'asc' | 'desc'>('desc');

  // Blogs Filters & Sort
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [blogStatusFilter, setBlogStatusFilter] = useState('all');
  const [blogDatePreset, setBlogDatePreset] = useState('all');
  const [blogStartDate, setBlogStartDate] = useState('');
  const [blogEndDate, setBlogEndDate] = useState('');
  const [blogSortField, setBlogSortField] = useState<'createdAt' | 'title' | 'views' | 'category' | 'published'>('createdAt');
  const [blogSortOrder, setBlogSortOrder] = useState<'asc' | 'desc'>('desc');

  // Reviews Filters & Sort
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewRatingFilter, setReviewRatingFilter] = useState('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState('all');
  const [reviewDatePreset, setReviewDatePreset] = useState('all');
  const [reviewStartDate, setReviewStartDate] = useState('');
  const [reviewEndDate, setReviewEndDate] = useState('');
  const [reviewSortField, setReviewSortField] = useState<'createdAt' | 'rating' | 'name'>('createdAt');
  const [reviewSortOrder, setReviewSortOrder] = useState<'asc' | 'desc'>('desc');

  // Astrologers Filters & Sort
  const [astrologerSearch, setAstrologerSearch] = useState('');
  const [astrologerStatusFilter, setAstrologerStatusFilter] = useState('all');
  const [astrologerDatePreset, setAstrologerDatePreset] = useState('all');
  const [astrologerStartDate, setAstrologerStartDate] = useState('');
  const [astrologerEndDate, setAstrologerEndDate] = useState('');
  const [astrologerSortField, setAstrologerSortField] = useState<'createdAt' | 'name' | 'rating' | 'experience'>('rating');
  const [astrologerSortOrder, setAstrologerSortOrder] = useState<'asc' | 'desc'>('desc');

  // Activity & Audit Logs State
  const [logs, setLogs] = useState<any[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [isLogsSuperAdmin, setIsLogsSuperAdmin] = useState(true);
  const [logsSearch, setLogsSearch] = useState('');
  const [logsCategoryFilter, setLogsCategoryFilter] = useState('all');
  const [logsActionFilter, setLogsActionFilter] = useState('all');
  const [logsDatePreset, setLogsDatePreset] = useState('all');
  const [logsStartDate, setLogsStartDate] = useState('');
  const [logsEndDate, setLogsEndDate] = useState('');
  const [logsSortField, setLogsSortField] = useState<'createdAt' | 'adminName' | 'category' | 'action'>('createdAt');
  const [logsSortOrder, setLogsSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedLogDetail, setSelectedLogDetail] = useState<any | null>(null);

  // Helper to toggle sort column
  const toggleSort = (
    field: any,
    currentField: any,
    currentOrder: 'asc' | 'desc',
    setField: (f: any) => void,
    setOrder: (o: 'asc' | 'desc') => void
  ) => {
    if (field === currentField) {
      setOrder(currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setField(field);
      setOrder('asc');
    }
  };

  // Helper to render sort indicator icon
  const renderSortIndicator = (field: string, currentField: string, currentOrder: 'asc' | 'desc') => {
    if (field !== currentField) {
      return <ArrowUpDown className="w-3 h-3 opacity-30 inline-block ml-1" />;
    }
    return currentOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-gold-400 inline-block ml-1" />
    ) : (
      <ArrowDown className="w-3 h-3 text-gold-400 inline-block ml-1" />
    );
  };

  // Modals state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    initials: '',
    location: '',
    text: '',
    rating: 5,
    date: 'Recently',
    active: true,
    order: 0,
  });

  // Modals state
  const [astrologerModalOpen, setAstrologerModalOpen] = useState(false);
  const [editingAstrologer, setEditingAstrologer] = useState<any | null>(null);
  const [astrologerForm, setAstrologerForm] = useState({
    name: '',
    title: 'Senior Vedic Astrologer',
    specialization: 'Vedic Astrology, Vastu',
    experience: '10 Years Experience',
    languages: 'Hindi, English',
    rating: 4.9,
    reviews: '100+',
    image: '',
    available: true,
    price: '₹25/min',
    bio: '',
    order: 0,
  });

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Astrology',
    excerpt: '',
    content: '',
    author: 'Bhagya Netram',
    image: 'blog1.jpeg',
    published: true,
    tags: '',
  });

  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<any | null>(null);
  const [queryStatusUpdate, setQueryStatusUpdate] = useState('pending');
  const [queryAdminNotes, setQueryAdminNotes] = useState('');

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [userCredits, setUserCredits] = useState(3);
  const [userAccountStatus, setUserAccountStatus] = useState('active');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    clearAdminSession();
    navigate('/pranav-admin/login');
  };

  // Load Initial Data
  const loadStats = async () => {
    try {
      const res = await fetchAdminStats();
      if (res.success && res.stats) {
        setStats({
          ...res.stats,
          totalBlogs: res.stats.totalBlogs > 0 ? res.stats.totalBlogs : 1,
          totalReviews: res.stats.totalReviews || reviews.length,
        });
      }
    } catch (err: any) {
      console.warn('Stats fetch error:', err.message);
    }
  };

  const loadAstrologers = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminAstrologers();
      if (res.success) {
        setAstrologers(res.data || []);
      }
    } catch (err: any) {
      showToast('Error loading astrologers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminBlogs();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setBlogs(res.data);
      } else {
        setBlogs([DEFAULT_WEBSITE_BLOG]);
      }
    } catch (err: any) {
      showToast('Error loading blogs: ' + err.message);
      setBlogs([DEFAULT_WEBSITE_BLOG]);
    } finally {
      setLoading(false);
    }
  };

  const loadQueries = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminQueries({ status: queryStatusFilter, search: querySearch });
      if (res.success) {
        setQueries(res.data || []);
      }
    } catch (err: any) {
      showToast('Error loading queries: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminUsers(userSearch);
      if (res.success) {
        setUsers(res.data || []);
      }
    } catch (err: any) {
      showToast('Error loading users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminReviews();
      if (res && res.success && Array.isArray(res.data)) {
        setReviews(res.data);
      }
    } catch (err: any) {
      showToast('Error loading reviews: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSubadmins = async () => {
    setSubadminsLoading(true);
    try {
      const res = await fetchSubadminsApi();
      if (res && res.success && Array.isArray(res.data)) {
        setSubadmins(res.data);
      }
    } catch (err: any) {
      console.warn('Error loading sub-admins:', err.message);
    } finally {
      setSubadminsLoading(false);
    }
  };

  const loadLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await fetchAdminLogsApi();
      if (res && res.success && Array.isArray(res.data)) {
        setLogs(res.data);
        setIsLogsSuperAdmin(Boolean(res.isSuperAdmin));
      }
    } catch (err: any) {
      console.warn('Error loading activity logs:', err.message);
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadReviews();
    loadSubadmins();
    loadLogs();
  }, []);

  useEffect(() => {
    if (activeTab === 'astrologers') loadAstrologers();
    if (activeTab === 'blogs') loadBlogs();
    if (activeTab === 'queries') loadQueries();
    if (activeTab === 'users') loadUsers();
    if (activeTab === 'reviews') loadReviews();
    if (activeTab === 'subadmins') loadSubadmins();
    if (activeTab === 'logs') loadLogs();
    if (activeTab === 'overview') {
      loadStats();
      loadQueries();
      loadReviews();
      loadSubadmins();
      loadLogs();
    }
  }, [activeTab, queryStatusFilter]);

  // ==========================================
  // FILTERED & SORTED MEMOIZED DATA
  // ==========================================

  // 1. Queries (Inquiries)
  const filteredAndSortedQueries = useMemo(() => {
    return queries
      .filter((q: any) => {
        // Status Filter
        if (queryStatusFilter !== 'all') {
          const currentStatus = (q.status || 'pending').toLowerCase();
          if (currentStatus !== queryStatusFilter.toLowerCase()) return false;
        }
        // Service Filter
        if (queryServiceFilter !== 'all') {
          const svc = Array.isArray(q.services) ? q.services.join(' ') : (q.services || '');
          if (!svc.toLowerCase().includes(queryServiceFilter.toLowerCase())) return false;
        }
        // Search Filter (name, phone, email, astrologer, message)
        if (querySearch.trim()) {
          const term = querySearch.toLowerCase();
          const nameM = (q.name || '').toLowerCase().includes(term);
          const phoneM = (q.phone || '').toLowerCase().includes(term);
          const emailM = (q.email || '').toLowerCase().includes(term);
          const astroM = (q.astrologerName || '').toLowerCase().includes(term);
          const svcM = (Array.isArray(q.services) ? q.services.join(' ') : (q.services || '')).toLowerCase().includes(term);
          if (!nameM && !phoneM && !emailM && !astroM && !svcM) return false;
        }
        // Date Filter
        if (!matchesDateFilter(q.createdAt, queryDatePreset, queryStartDate, queryEndDate)) {
          return false;
        }
        return true;
      })
      .sort((a: any, b: any) => {
        let valA = a[querySortField];
        let valB = b[querySortField];

        if (querySortField === 'createdAt') {
          valA = new Date(valA || 0).getTime();
          valB = new Date(valB || 0).getTime();
        } else if (querySortField === 'services') {
          valA = Array.isArray(valA) ? valA.join(', ') : (valA || '');
          valB = Array.isArray(valB) ? valB.join(', ') : (valB || '');
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        } else if (typeof valA === 'string') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return querySortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return querySortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [queries, queryStatusFilter, queryServiceFilter, querySearch, querySortField, querySortOrder, queryDatePreset, queryStartDate, queryEndDate]);

  // 2. Overview Recent Inquiries
  const overviewFilteredAndSortedQueries = useMemo(() => {
    return queries
      .filter((q: any) => {
        if (overviewStatusFilter !== 'all') {
          const currentStatus = (q.status || 'pending').toLowerCase();
          if (currentStatus !== overviewStatusFilter.toLowerCase()) return false;
        }
        if (!matchesDateFilter(q.createdAt, overviewDatePreset, overviewStartDate, overviewEndDate)) {
          return false;
        }
        return true;
      })
      .sort((a: any, b: any) => {
        let valA = a[overviewSortField];
        let valB = b[overviewSortField];

        if (overviewSortField === 'createdAt') {
          valA = new Date(valA || 0).getTime();
          valB = new Date(valB || 0).getTime();
        } else if (typeof valA === 'string') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return overviewSortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return overviewSortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [queries, overviewStatusFilter, overviewSortField, overviewSortOrder, overviewDatePreset, overviewStartDate, overviewEndDate]);

  // 3. User Accounts
  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((u: any) => {
        // Status filter
        if (userStatusFilter !== 'all') {
          const st = (u.status || 'active').toLowerCase();
          if (st !== userStatusFilter.toLowerCase()) return false;
        }
        // Credits filter
        if (userCreditsFilter === 'has_credits' && (u.palmistryCredits || 0) <= 0) return false;
        if (userCreditsFilter === 'zero_credits' && (u.palmistryCredits || 0) > 0) return false;

        // Search filter
        if (userSearch.trim()) {
          const term = userSearch.toLowerCase();
          const nameM = (u.name || '').toLowerCase().includes(term);
          const emailM = (u.email || '').toLowerCase().includes(term);
          const phoneM = (u.phone || '').toLowerCase().includes(term);
          if (!nameM && !emailM && !phoneM) return false;
        }

        // Date filter
        if (!matchesDateFilter(u.createdAt, userDatePreset, userStartDate, userEndDate)) {
          return false;
        }
        return true;
      })
      .sort((a: any, b: any) => {
        let valA = a[userSortField];
        let valB = b[userSortField];

        if (userSortField === 'createdAt') {
          valA = new Date(valA || 0).getTime();
          valB = new Date(valB || 0).getTime();
        } else if (userSortField === 'palmistryCredits') {
          valA = Number(valA ?? 0);
          valB = Number(valB ?? 0);
        } else if (typeof valA === 'string') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return userSortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return userSortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, userStatusFilter, userCreditsFilter, userSearch, userSortField, userSortOrder, userDatePreset, userStartDate, userEndDate]);

  // 4. Blogs
  const filteredAndSortedBlogs = useMemo(() => {
    return blogs
      .filter((b: any) => {
        // Category filter
        if (blogCategoryFilter !== 'all') {
          if ((b.category || '').toLowerCase() !== blogCategoryFilter.toLowerCase()) return false;
        }
        // Status filter
        if (blogStatusFilter === 'published' && !b.published) return false;
        if (blogStatusFilter === 'draft' && b.published) return false;

        // Search filter
        if (blogSearch.trim()) {
          const term = blogSearch.toLowerCase();
          const titleM = (b.title || '').toLowerCase().includes(term);
          const slugM = (b.slug || '').toLowerCase().includes(term);
          const authorM = (b.author || '').toLowerCase().includes(term);
          if (!titleM && !slugM && !authorM) return false;
        }

        // Date filter
        if (!matchesDateFilter(b.createdAt || b.date, blogDatePreset, blogStartDate, blogEndDate)) {
          return false;
        }
        return true;
      })
      .sort((a: any, b: any) => {
        let valA = a[blogSortField];
        let valB = b[blogSortField];

        if (blogSortField === 'createdAt') {
          valA = new Date(valA || a.date || 0).getTime();
          valB = new Date(valB || b.date || 0).getTime();
        } else if (blogSortField === 'views') {
          valA = Number(valA || 0);
          valB = Number(valB || 0);
        } else if (blogSortField === 'published') {
          valA = valA ? 1 : 0;
          valB = valB ? 1 : 0;
        } else if (typeof valA === 'string') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return blogSortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return blogSortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [blogs, blogCategoryFilter, blogStatusFilter, blogSearch, blogSortField, blogSortOrder, blogDatePreset, blogStartDate, blogEndDate]);

  // 5. Reviews
  const filteredAndSortedReviews = useMemo(() => {
    return reviews
      .filter((r: any) => {
        // Status filter
        if (reviewStatusFilter === 'active' && r.active === false) return false;
        if (reviewStatusFilter === 'hidden' && r.active !== false) return false;

        // Rating filter
        if (reviewRatingFilter !== 'all') {
          if (Math.floor(r.rating || 5) !== Number(reviewRatingFilter)) return false;
        }

        // Search filter
        if (reviewSearch.trim()) {
          const term = reviewSearch.toLowerCase();
          const nameM = (r.name || '').toLowerCase().includes(term);
          const cityM = (r.location || '').toLowerCase().includes(term);
          const textM = (r.text || '').toLowerCase().includes(term);
          if (!nameM && !cityM && !textM) return false;
        }

        // Date filter
        if (!matchesDateFilter(r.createdAt || r.date, reviewDatePreset, reviewStartDate, reviewEndDate)) {
          return false;
        }
        return true;
      })
      .sort((a: any, b: any) => {
        let valA = a[reviewSortField];
        let valB = b[reviewSortField];

        if (reviewSortField === 'createdAt') {
          valA = new Date(valA || 0).getTime();
          valB = new Date(valB || 0).getTime();
        } else if (reviewSortField === 'rating') {
          valA = Number(valA || 5);
          valB = Number(valB || 5);
        } else if (typeof valA === 'string') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return reviewSortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return reviewSortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [reviews, reviewStatusFilter, reviewRatingFilter, reviewSearch, reviewSortField, reviewSortOrder, reviewDatePreset, reviewStartDate, reviewEndDate]);

  // 6. Activity & Audit Logs
  const filteredAndSortedLogs = useMemo(() => {
    return logs
      .filter((l: any) => {
        // Category filter
        if (logsCategoryFilter !== 'all' && (l.category || '').toLowerCase() !== logsCategoryFilter.toLowerCase()) {
          return false;
        }

        // Action filter
        if (logsActionFilter !== 'all') {
          const act = (l.action || '').toLowerCase();
          if (logsActionFilter === 'create' && !act.includes('create') && !act.includes('init')) return false;
          if (logsActionFilter === 'update' && !act.includes('update')) return false;
          if (logsActionFilter === 'delete' && !act.includes('delete') && !act.includes('remove')) return false;
          if (logsActionFilter === 'status' && !act.includes('status')) return false;
          if (logsActionFilter === 'security' && !act.includes('password') && !act.includes('login') && l.category !== 'security') return false;
        }

        // Search term filter
        if (logsSearch.trim()) {
          const q = logsSearch.toLowerCase();
          const descM = (l.description || '').toLowerCase().includes(q);
          const adminM = (l.adminName || '').toLowerCase().includes(q);
          const emailM = (l.adminEmail || '').toLowerCase().includes(q);
          const actionM = (l.action || '').toLowerCase().includes(q);
          const targetM = (l.targetTitle || '').toLowerCase().includes(q);
          const catM = (l.category || '').toLowerCase().includes(q);
          if (!descM && !adminM && !emailM && !actionM && !targetM && !catM) return false;
        }

        // Date filter
        if (!matchesDateFilter(l.createdAt, logsDatePreset, logsStartDate, logsEndDate)) {
          return false;
        }
        return true;
      })
      .sort((a: any, b: any) => {
        let valA = a[logsSortField];
        let valB = b[logsSortField];

        if (logsSortField === 'createdAt') {
          valA = new Date(valA || 0).getTime();
          valB = new Date(valB || 0).getTime();
        } else if (typeof valA === 'string') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return logsSortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return logsSortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [logs, logsCategoryFilter, logsActionFilter, logsSearch, logsSortField, logsSortOrder, logsDatePreset, logsStartDate, logsEndDate]);

  // 7. Astrologers
  const filteredAndSortedAstrologers = useMemo(() => {
    return astrologers
      .filter((a: any) => {
        if (astrologerStatusFilter === 'active' && a.available === false) return false;
        if (astrologerStatusFilter === 'offline' && a.available !== false) return false;

        if (astrologerSearch.trim()) {
          const q = astrologerSearch.toLowerCase();
          const nameM = (a.name || '').toLowerCase().includes(q);
          const specM = (a.specialization || '').toLowerCase().includes(q);
          const titleM = (a.title || '').toLowerCase().includes(q);
          const langM = (a.languages || '').toLowerCase().includes(q);
          if (!nameM && !specM && !titleM && !langM) return false;
        }

        if (!matchesDateFilter(a.createdAt, astrologerDatePreset, astrologerStartDate, astrologerEndDate)) {
          return false;
        }
        return true;
      })
      .sort((a: any, b: any) => {
        let valA = a[astrologerSortField];
        let valB = b[astrologerSortField];

        if (astrologerSortField === 'createdAt') {
          valA = new Date(valA || 0).getTime();
          valB = new Date(valB || 0).getTime();
        } else if (astrologerSortField === 'rating') {
          valA = Number(valA || 0);
          valB = Number(valB || 0);
        } else if (astrologerSortField === 'experience') {
          valA = parseInt(String(valA || '0'), 10) || 0;
          valB = parseInt(String(valB || '0'), 10) || 0;
        } else if (typeof valA === 'string') {
          valA = (valA || '').toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return astrologerSortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return astrologerSortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [astrologers, astrologerStatusFilter, astrologerSearch, astrologerDatePreset, astrologerStartDate, astrologerEndDate, astrologerSortField, astrologerSortOrder]);

  // ==========================================
  // CSV EXPORT HANDLERS
  // ==========================================
  const exportLogsCSV = () => {
    if (!filteredAndSortedLogs || filteredAndSortedLogs.length === 0) {
      showToast('No activity logs available to export.');
      return;
    }
    const headers = [
      'Timestamp (IST)',
      'Admin Name',
      'Admin Email',
      'Administrative Role',
      'Category Module',
      'Action Code',
      'Event Description',
      'Target Resource',
      'Client IP / Device',
    ];
    const rows = filteredAndSortedLogs.map((l: any) => [
      new Date(l.createdAt).toLocaleString('en-IN'),
      l.adminName || 'Admin',
      l.adminEmail || '',
      (l.adminRole || 'subadmin').toUpperCase(),
      (l.category || 'system').toUpperCase(),
      l.action || '',
      l.description || '',
      l.targetTitle || l.targetId || '',
      l.ip || '127.0.0.1',
    ]);
    exportToCSV(`bhagyanetram_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast(`Exported ${rows.length} audit log events to CSV.`);
  };
  const exportQueriesCSV = (items?: any[]) => {
    const list = items || filteredAndSortedQueries;
    if (!list || list.length === 0) {
      showToast('No customer inquiries available to export.');
      return;
    }
    const headers = [
      'Received Date & Time',
      'Client Name',
      'Mobile Phone',
      'Email Address',
      'Service Requested',
      'Preferred Astrologer',
      'Preferred Date',
      'Preferred Time',
      'Status',
      'Message / Inquiry Details',
    ];
    const rows = list.map((q: any) => [
      new Date(q.createdAt).toLocaleString('en-IN'),
      q.name || '',
      q.phone || '',
      q.email || '',
      Array.isArray(q.services) ? q.services.join(', ') : (q.services || 'General Consultation'),
      q.astrologerName || 'Any Available',
      q.preferredDate || '',
      q.preferredTime || '',
      (q.status || 'pending').toUpperCase(),
      q.message || '',
    ]);
    exportToCSV(`bhagyanetram_inquiries_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast(`Exported ${rows.length} consultation inquiries to CSV file.`);
  };

  const exportUsersCSV = () => {
    if (!filteredAndSortedUsers || filteredAndSortedUsers.length === 0) {
      showToast('No user accounts available to export.');
      return;
    }
    const headers = [
      'User Name',
      'Email Address',
      'Mobile Phone',
      'Palmistry Credits',
      'Account Status',
      'Role',
      'Registered Date',
    ];
    const rows = filteredAndSortedUsers.map((u: any) => [
      u.name || '',
      u.email || '',
      u.phone || '',
      u.palmistryCredits ?? 3,
      (u.status || 'active').toUpperCase(),
      u.role || 'user',
      new Date(u.createdAt).toLocaleDateString('en-IN'),
    ]);
    exportToCSV(`bhagyanetram_users_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast(`Exported ${rows.length} user accounts to CSV file.`);
  };

  const exportBlogsCSV = () => {
    if (!filteredAndSortedBlogs || filteredAndSortedBlogs.length === 0) {
      showToast('No articles available to export.');
      return;
    }
    const headers = [
      'Article Title',
      'Public URL',
      'Category',
      'Author',
      'Published Date',
      'Views Count',
      'Status',
      'Summary / Excerpt',
    ];
    const rows = filteredAndSortedBlogs.map((b: any) => [
      b.title || '',
      `https://bhagyanetram.com/blog/${b.slug || ''}`,
      b.category || 'General',
      b.author || 'Bhagya Netram',
      b.date || '',
      b.views || 0,
      b.published ? 'PUBLISHED' : 'DRAFT',
      b.excerpt || '',
    ]);
    exportToCSV(`bhagyanetram_blogs_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast(`Exported ${rows.length} blog articles to CSV file.`);
  };

  const exportReviewsCSV = () => {
    if (!filteredAndSortedReviews || filteredAndSortedReviews.length === 0) {
      showToast('No reviews available to export.');
      return;
    }
    const headers = [
      'Client Name',
      'Avatar Initials',
      'Location / City',
      'Rating (Stars)',
      'Display Date',
      'Featured on Website',
      'Testimonial Quote',
    ];
    const rows = filteredAndSortedReviews.map((r: any) => [
      r.name || '',
      r.initials || '',
      r.location || 'India',
      `${r.rating || 5} Stars`,
      r.date || 'Recently',
      r.active !== false ? 'YES (VISIBLE)' : 'NO (HIDDEN)',
      r.text || '',
    ]);
    exportToCSV(`bhagyanetram_reviews_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast(`Exported ${rows.length} client reviews to CSV file.`);
  };

  const exportAstrologersCSV = () => {
    if (!filteredAndSortedAstrologers || filteredAndSortedAstrologers.length === 0) {
      showToast('No astrologer profiles available to export.');
      return;
    }
    const headers = [
      'Astrologer Name',
      'Title / Designation',
      'Specialization',
      'Experience',
      'Languages',
      'Rating',
      'Reviews Count',
      'Status',
      'Short Bio',
      'Added Date',
    ];
    const rows = filteredAndSortedAstrologers.map((a: any) => [
      a.name || '',
      a.title || '',
      a.specialization || '',
      a.experience || '',
      a.languages || '',
      a.rating || 4.9,
      a.reviews || '100+',
      a.available !== false ? 'ACTIVE' : 'OFFLINE',
      a.bio || '',
      a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN') : 'N/A',
    ]);
    exportToCSV(`bhagyanetram_astrologers_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
    showToast(`Exported ${rows.length} astrologer profiles to CSV file.`);
  };

  // ==========================================
  // REVIEW & TESTIMONIAL ACTIONS
  // ==========================================
  const handleOpenAddReview = () => {
    setEditingReview(null);
    setReviewForm({
      name: '',
      initials: '',
      location: 'Mumbai',
      text: '',
      rating: 5,
      date: 'Just now',
      active: true,
      order: reviews.length + 1,
    });
    setReviewModalOpen(true);
  };

  const handleOpenEditReview = (review: any) => {
    setEditingReview(review);
    setReviewForm({
      name: review.name || '',
      initials: review.initials || '',
      location: review.location || '',
      text: review.text || '',
      rating: review.rating || 5,
      date: review.date || 'Recently',
      active: review.active !== false,
      order: review.order || 0,
    });
    setReviewModalOpen(true);
  };

  const handleToggleReviewActive = async (review: any) => {
    setActionLoading(true);
    try {
      const id = review._id || review.id;
      const updatedActive = !review.active;
      await updateReviewApi(id, { active: updatedActive });
      showToast(`Review by "${review.name}" marked as ${updatedActive ? 'Visible' : 'Hidden'}.`);
      loadReviews();
      loadStats();
    } catch (err: any) {
      showToast('Error updating review status: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      showToast('Please enter both client name and review text.');
      return;
    }

    setActionLoading(true);
    try {
      if (editingReview) {
        const id = editingReview._id || editingReview.id;
        const res = await updateReviewApi(id, reviewForm);
        showToast(res.message || 'Review updated successfully!');
      } else {
        const res = await createReviewApi(reviewForm);
        showToast(res.message || 'New review published successfully!');
      }
      setReviewModalOpen(false);
      loadReviews();
      loadStats();
    } catch (err: any) {
      showToast('Error saving review: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteReview = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove the review by "${name}"?`)) {
      return;
    }
    setActionLoading(true);
    try {
      await deleteReviewApi(id);
      showToast(`Review by "${name}" removed successfully.`);
      loadReviews();
      loadStats();
    } catch (err: any) {
      showToast('Error deleting review: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // ADMIN SECURITY & SUB-ADMIN ACTIONS
  // ==========================================
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError(null);

    if (!currentPassword) {
      setChangePasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setChangePasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePasswordError('New password and confirmation password do not match.');
      return;
    }

    setChangePasswordLoading(true);
    try {
      const res = await changeAdminPasswordApi({ currentPassword, newPassword });
      if (res && res.success) {
        showToast('Admin password changed successfully! Keep your new credentials safe.');
        setChangePasswordModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setChangePasswordError(res?.error || 'Failed to update password.');
      }
    } catch (err: any) {
      setChangePasswordError(err.message || 'Failed to update password.');
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleCreateSubadmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subadminForm.name || !subadminForm.email || !subadminForm.password) {
      showToast('Please fill all required sub-admin details.');
      return;
    }
    if (subadminForm.password.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }

    setSubadminActionLoading(true);
    try {
      const res = await createSubadminApi(subadminForm);
      if (res && res.success) {
        showToast(`Sub-admin "${subadminForm.name}" created successfully!`);
        setSubadminForm({
          name: '',
          email: '',
          password: '',
          role: 'subadmin',
          permissions: ['astrologers', 'blogs', 'queries', 'reviews', 'users'],
        });
        setSubadminModalTab('list');
        await loadSubadmins();
      }
    } catch (err: any) {
      showToast('Error creating sub-admin: ' + err.message);
    } finally {
      setSubadminActionLoading(false);
    }
  };

  const handleToggleSubadminStatus = async (sub: any) => {
    const newStatus = sub.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await updateSubadminApi(sub._id || sub.id, { status: newStatus });
      if (res && res.success) {
        showToast(`Sub-admin status set to ${newStatus.toUpperCase()}`);
        await loadSubadmins();
      }
    } catch (err: any) {
      showToast('Error updating status: ' + err.message);
    }
  };

  const handleDeleteSubadmin = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove sub-admin "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await deleteSubadminApi(id);
      if (res && res.success) {
        showToast(`Sub-admin "${name}" removed successfully.`);
        await loadSubadmins();
      }
    } catch (err: any) {
      showToast('Error removing sub-admin: ' + err.message);
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    let pass = '';
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSubadminForm((prev) => ({ ...prev, password: pass }));
    setShowSubadminPassword(true);
  };

  // ==========================================
  // ASTROLOGER ACTIONS
  // ==========================================
  const handleOpenAddAstrologer = () => {
    setEditingAstrologer(null);
    setAstrologerForm({
      name: '',
      title: 'Senior Vedic Astrologer',
      specialization: 'Vedic Astrology, Vastu',
      experience: '10 Years Experience',
      languages: 'Hindi, English',
      rating: 4.9,
      reviews: '100+',
      image: '',
      available: true,
      price: '₹25/min',
      bio: '',
      order: astrologers.length + 1,
    });
    setAstrologerModalOpen(true);
  };

  const compressImage = (file: File, maxWidth = 800, quality = 0.88): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxWidth) {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('Please select a photo smaller than 10MB');
        return;
      }
      try {
        const compressedBase64 = await compressImage(file, 800, 0.88);
        setAstrologerForm((prev) => ({ ...prev, image: compressedBase64 }));
        showToast('Photo loaded! It will be saved into MongoDB upon clicking Update.');
      } catch (err: any) {
        console.error('Image compression error:', err);
        showToast('Failed to process image. Please try again.');
      }
    }
  };

  const handleOpenEditAstrologer = (astrologer: any) => {
    setEditingAstrologer(astrologer);
    const resolvedImg = (astrologer.image && (astrologer.image.startsWith('data:image/') || astrologer.image.startsWith('http')))
      ? astrologer.image
      : resolveAstrologerImage(astrologer);

    setAstrologerForm({
      name: astrologer.name || '',
      title: astrologer.title || '',
      specialization: astrologer.specialization || '',
      experience: astrologer.experience || '',
      languages: astrologer.languages || '',
      rating: astrologer.rating || 4.9,
      reviews: astrologer.reviews || '',
      image: resolvedImg || '',
      available: astrologer.available !== undefined ? astrologer.available : true,
      price: astrologer.price || '',
      bio: astrologer.bio || '',
      order: astrologer.order || 0,
    });
    setAstrologerModalOpen(true);
  };

  const handleSaveAstrologer = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingAstrologer) {
        const res = await updateAstrologerApi(editingAstrologer._id || editingAstrologer.id, astrologerForm);
        showToast(res.message || 'Astrologer updated successfully!');
      } else {
        const res = await createAstrologerApi(astrologerForm);
        showToast(res.message || 'New astrologer added to website!');
      }
      setAstrologerModalOpen(false);
      loadAstrologers();
      loadStats();
    } catch (err: any) {
      showToast('Error saving astrologer: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAstrologer = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove astrologer "${name}" from the website?`)) {
      return;
    }
    setActionLoading(true);
    try {
      await deleteAstrologerApi(id);
      showToast(`Astrologer "${name}" removed successfully.`);
      loadAstrologers();
      loadStats();
    } catch (err: any) {
      showToast('Error deleting astrologer: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleAstrologerAvailability = async (astrologer: any) => {
    try {
      const updatedStatus = !astrologer.available;
      await updateAstrologerApi(astrologer._id || astrologer.id, { available: updatedStatus });
      setAstrologers((prev) =>
        prev.map((a) => (a._id === astrologer._id ? { ...a, available: updatedStatus } : a))
      );
      showToast(`${astrologer.name} marked as ${updatedStatus ? 'Available' : 'Unavailable'}.`);
    } catch (err: any) {
      showToast('Error updating status: ' + err.message);
    }
  };

  // ==========================================
  // BLOG ACTIONS
  // ==========================================
  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      category: 'Astrology',
      excerpt: '',
      content: '',
      author: 'Bhagya Netram',
      image: 'blog1.jpeg',
      published: true,
      tags: 'Astrology, Remedies, Vastu',
    });
    setBlogModalOpen(true);
  };

  const handleOpenEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || 'Astrology',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || 'Bhagya Netram',
      image: blog.image || 'blog1.jpeg',
      published: blog.published !== undefined ? blog.published : true,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
    });
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...blogForm,
        tags: blogForm.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingBlog) {
        const res = await updateBlogApi(editingBlog._id || editingBlog.id, payload);
        showToast(res.message || 'Blog updated successfully!');
      } else {
        const res = await createBlogApi(payload);
        showToast(res.message || 'Blog article published successfully!');
      }
      setBlogModalOpen(false);
      loadBlogs();
      loadStats();
    } catch (err: any) {
      showToast('Error saving blog: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete blog "${title}"?`)) {
      return;
    }
    setActionLoading(true);
    try {
      await deleteBlogApi(id);
      showToast(`Blog post deleted successfully.`);
      loadBlogs();
      loadStats();
    } catch (err: any) {
      showToast('Error deleting blog: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // QUERY / INQUIRY ACTIONS
  // ==========================================
  const handleOpenQueryDetails = (query: any) => {
    setSelectedQuery(query);
    setQueryStatusUpdate(query.status || 'pending');
    setQueryAdminNotes(query.adminNotes || '');
    setQueryModalOpen(true);
  };

  const handleUpdateQueryStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuery) return;
    setActionLoading(true);
    try {
      await updateQueryStatusApi(selectedQuery._id || selectedQuery.id, {
        status: queryStatusUpdate,
        adminNotes: queryAdminNotes,
      });
      showToast('Inquiry status updated successfully.');
      setQueryModalOpen(false);
      loadQueries();
      loadStats();
    } catch (err: any) {
      showToast('Error updating query: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteQuery = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry record?')) {
      return;
    }
    setActionLoading(true);
    try {
      await deleteQueryApi(id);
      showToast('Inquiry deleted.');
      loadQueries();
      loadStats();
    } catch (err: any) {
      showToast('Error deleting inquiry: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // USER ACTIONS
  // ==========================================
  const handleOpenEditUser = (user: any) => {
    setSelectedUser(user);
    setUserCredits(user.palmistryCredits !== undefined ? user.palmistryCredits : 3);
    setUserAccountStatus(user.status || 'active');
    setUserModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await updateUserApi(selectedUser._id || selectedUser.id, {
        palmistryCredits: userCredits,
        status: userAccountStatus,
      });
      showToast('User account updated successfully.');
      setUserModalOpen(false);
      loadUsers();
      loadStats();
    } catch (err: any) {
      showToast('Error updating user: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!window.confirm(`Permanently remove user "${name}"?`)) {
      return;
    }
    setActionLoading(true);
    try {
      await deleteUserApi(id);
      showToast(`User account removed.`);
      loadUsers();
      loadStats();
    } catch (err: any) {
      showToast('Error deleting user: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-950 text-white flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-gold-500 text-cosmic-950 font-bold px-5 py-3 rounded-2xl shadow-gold-glow flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-cosmic-950 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-cosmic-900 border-r border-gold-500/20 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Logo & Title */}
          <div className="p-5 border-b border-gold-500/15 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 border border-gold-500/40 shadow-xs flex items-center justify-center overflow-hidden">
                <img src={logoImage} alt="BhagyaNetram" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-wide text-white block">
                  BhagyaNetram
                </span>
                <span className="text-[10px] text-gold-400 font-semibold uppercase tracking-wider block">
                  Admin Command
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('astrologers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'astrologers'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                <span>Astrologers</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                {stats.totalAstrologers || astrologers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'blogs'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Blogs & Wisdom</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                {stats.totalBlogs > 0 ? stats.totalBlogs : (blogs.length > 0 ? blogs.length : 1)}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('queries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'queries'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Queries & Inquiries</span>
              </div>
              {stats.pendingQueries > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-cosmic-950 animate-pulse">
                  {stats.pendingQueries} new
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>User Accounts</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                {stats.totalUsers || users.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Quote className="w-4 h-4" />
                <span>Client Reviews</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                {stats.totalReviews || reviews.length}
              </span>
            </button>

            {/* Activity & Audit Logs */}
            <button
              onClick={() => {
                setActiveTab('logs');
                loadLogs();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'logs'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4" />
                <span>Activity Logs</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                {logs.length}
              </span>
            </button>

            {/* <button
              onClick={() => {
                setActiveTab('subadmins');
                loadSubadmins();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'subadmins'
                  ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow font-bold'
                  : 'text-ivory-200/80 hover:bg-cosmic-800 hover:text-gold-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Sub-Admins</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
                {subadmins.length}
              </span>
            </button> */}
          </nav>
        </div>

        {/* Admin Footer & Logout */}
        <div className="p-4 border-t border-gold-500/15 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-gold-300 hover:bg-cosmic-800 transition"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-gold-500/20 bg-cosmic-900/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0 relative z-30">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-display font-bold text-white capitalize">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'astrologers' && 'Manage Astrologers'}
              {activeTab === 'blogs' && 'Manage Blogs & Wisdom Library'}
              {activeTab === 'queries' && 'Customer Inquiries & Consultations'}
              {activeTab === 'users' && 'Registered User Accounts'}
              {activeTab === 'reviews' && 'Manage Client Reviews & Testimonials'}
              {activeTab === 'subadmins' && 'Sub-Administrator Management'}
              {activeTab === 'logs' && 'Administrative Activity & Audit Logs'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Action: Change Password */}
            <button
              onClick={() => setChangePasswordModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cosmic-950/80 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-cosmic-950 transition text-xs font-semibold cursor-pointer shadow-sm"
              title="Change Password"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>

            {/* Quick Action: Manage Subadmins */}
            {/* <button
              onClick={() => {
                loadSubadmins();
                setSubadminsModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cosmic-950/80 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-cosmic-950 transition text-xs font-semibold cursor-pointer shadow-sm"
              title="Add / Remove Sub-Admins"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sub-Admins</span>
              {subadmins.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-bold">
                  {subadmins.length}
                </span>
              )}
            </button> */}

            {/* Admin Profile Dropdown Trigger (Highlighted by user) */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  if (!profileDropdownOpen) loadSubadmins();
                }}
                className={`flex items-center gap-3 p-1.5 sm:px-3 sm:py-2 rounded-2xl border transition cursor-pointer select-none ${
                  profileDropdownOpen
                    ? 'bg-cosmic-800 border-gold-400 shadow-gold-card'
                    : 'bg-cosmic-950/60 border-gold-500/30 hover:border-gold-400 hover:bg-cosmic-800/80'
                }`}
                title="Admin Account Options (Change Password & Sub-Admins)"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-gold-300 block leading-tight">
                    {adminUser.name}
                  </span>
                  <span className="text-[10px] text-ivory-200/60 block">
                    {adminUser.email}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-500/30 to-gold-600/10 border border-gold-500/50 text-gold-300 flex items-center justify-center font-bold text-xs shadow-inner">
                  AD
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gold-400 transition-transform ${
                    profileDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-cosmic-900 border border-gold-500/40 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2.5 border-b border-gold-500/15 mb-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate block">
                          {adminUser.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-bold text-[9px] uppercase tracking-wider">
                          {adminUser.role || 'Super Admin'}
                        </span>
                      </div>
                      <span className="text-[10px] text-ivory-200/60 block truncate mt-0.5">
                        {adminUser.email}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setChangePasswordModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-ivory-200 hover:bg-gold-500 hover:text-cosmic-950 font-medium transition cursor-pointer text-left group"
                      >
                        <KeyRound className="w-4 h-4 text-gold-400 group-hover:text-cosmic-950 shrink-0" />
                        <div>
                          <div className="font-semibold">Change Password</div>
                          <div className="text-[10px] opacity-75">Update your account login password</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          loadSubadmins();
                          setSubadminsModalOpen(true);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-ivory-200 hover:bg-gold-500 hover:text-cosmic-950 font-medium transition cursor-pointer text-left group"
                      >
                        <div className="flex items-center gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-gold-400 group-hover:text-cosmic-950 shrink-0" />
                          <div>
                            <div className="font-semibold">Manage Sub-Admins</div>
                            <div className="text-[10px] opacity-75">Add or remove sub-admin access</div>
                          </div>
                        </div>
                        {subadmins.length > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-cosmic-950/80 text-gold-300 text-[10px] font-bold">
                            {subadmins.length}
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="border-t border-gold-500/15 mt-1.5 pt-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-300 hover:bg-red-500/20 transition cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-4 sm:p-8 space-y-6">

          {/* =========================================================
              TAB 1: DASHBOARD OVERVIEW
          ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div 
                  onClick={() => setActiveTab('astrologers')}
                  className="bg-cosmic-900/80 border border-gold-500/30 p-5 rounded-2xl shadow-md hover:border-gold-400 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-gold-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Astrologers</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {stats.totalAstrologers}
                  </div>
                  <span className="text-[11px] text-ivory-200/60 mt-1 block">Live on homepage</span>
                </div>

                <div 
                  onClick={() => setActiveTab('blogs')}
                  className="bg-cosmic-900/80 border border-gold-500/30 p-5 rounded-2xl shadow-md hover:border-gold-400 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-gold-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Blogs</span>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {stats.totalBlogs > 0 ? stats.totalBlogs : (blogs.length > 0 ? blogs.length : 1)}
                  </div>
                  <span className="text-[11px] text-ivory-200/60 mt-1 block">Published articles</span>
                </div>

                <div 
                  onClick={() => setActiveTab('queries')}
                  className="bg-cosmic-900/80 border border-gold-500/30 p-5 rounded-2xl shadow-md hover:border-gold-400 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-amber-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Pending Inquiries</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-amber-300">
                    {stats.pendingQueries}
                  </div>
                  <span className="text-[11px] text-ivory-200/60 mt-1 block">Awaiting follow-up</span>
                </div>

                <div 
                  onClick={() => setActiveTab('users')}
                  className="bg-cosmic-900/80 border border-gold-500/30 p-5 rounded-2xl shadow-md hover:border-gold-400 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-gold-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">User Accounts</span>
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {stats.totalUsers}
                  </div>
                  <span className="text-[11px] text-ivory-200/60 mt-1 block">Registered clients</span>
                </div>

                <div 
                  onClick={() => setActiveTab('reviews')}
                  className="bg-cosmic-900/80 border border-gold-500/30 p-5 rounded-2xl shadow-md hover:border-gold-400 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-gold-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Client Reviews</span>
                    <Quote className="w-4 h-4" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {stats.totalReviews || reviews.length}
                  </div>
                  <span className="text-[11px] text-ivory-200/60 mt-1 block">Real stories & feedback</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-cosmic-900/60 border border-gold-500/20 rounded-2xl p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleOpenAddAstrologer}
                    className="px-4 py-2.5 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Astrologer</span>
                  </button>

                  <button
                    onClick={handleOpenAddReview}
                    className="px-4 py-2.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 font-bold text-xs flex items-center gap-1.5 hover:bg-gold-500/25 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Client Review</span>
                  </button>

                  <button
                    onClick={handleOpenAddBlog}
                    className="px-4 py-2.5 rounded-xl bg-cosmic-800 border border-gold-500/40 text-gold-300 font-bold text-xs flex items-center gap-1.5 hover:bg-cosmic-700 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Blog Post</span>
                  </button>

                  <button
                    onClick={() => {
                      setQueryStatusFilter('pending');
                      setActiveTab('queries');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-500/30 transition cursor-pointer"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Review Pending Queries ({stats.pendingQueries})</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview with Filter, Sort & CSV Export */}
              <div className="bg-cosmic-900/80 border border-gold-500/25 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gold-400" />
                      <span>Recent Customer Consultation Requests</span>
                    </h3>
                    <span className="text-[11px] text-ivory-200/50 block mt-0.5">
                      Showing {overviewFilteredAndSortedQueries.length} of {queries.length} requests
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-1 bg-cosmic-950 p-1 rounded-xl border border-gold-500/20">
                      {['all', 'pending', 'contacted', 'resolved'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setOverviewStatusFilter(st)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                            overviewStatusFilter === st
                              ? 'bg-gold-500 text-cosmic-950 shadow-xs'
                              : 'text-ivory-200/70 hover:text-white hover:bg-cosmic-800'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    {/* Date Filter */}
                    <TableDateFilter
                      preset={overviewDatePreset}
                      setPreset={setOverviewDatePreset}
                      startDate={overviewStartDate}
                      setStartDate={setOverviewStartDate}
                      endDate={overviewEndDate}
                      setEndDate={setOverviewEndDate}
                      compact
                    />

                    {/* CSV Export Button */}
                    <button
                      onClick={() => exportQueriesCSV(overviewFilteredAndSortedQueries)}
                      className="px-3 py-1.5 rounded-xl bg-cosmic-800 hover:bg-gold-500 hover:text-cosmic-950 text-gold-300 font-semibold text-xs flex items-center gap-1.5 border border-gold-500/30 transition cursor-pointer"
                      title="Export filtered records to CSV"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('queries')}
                      className="text-xs text-gold-400 hover:text-gold-300 font-semibold ml-1 cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gold-500/20 text-gold-400">
                        <th
                          onClick={() => toggleSort('name', overviewSortField, overviewSortOrder, setOverviewSortField, setOverviewSortOrder)}
                          className="pb-3 font-semibold cursor-pointer select-none hover:text-gold-300"
                        >
                          Client Name {renderSortIndicator('name', overviewSortField, overviewSortOrder)}
                        </th>
                        <th className="pb-3 font-semibold">Contact Info</th>
                        <th
                          onClick={() => toggleSort('services', overviewSortField, overviewSortOrder, setOverviewSortField, setOverviewSortOrder)}
                          className="pb-3 font-semibold cursor-pointer select-none hover:text-gold-300"
                        >
                          Service {renderSortIndicator('services', overviewSortField, overviewSortOrder)}
                        </th>
                        <th
                          onClick={() => toggleSort('status', overviewSortField, overviewSortOrder, setOverviewSortField, setOverviewSortOrder)}
                          className="pb-3 font-semibold cursor-pointer select-none hover:text-gold-300"
                        >
                          Status {renderSortIndicator('status', overviewSortField, overviewSortOrder)}
                        </th>
                        <th
                          onClick={() => toggleSort('createdAt', overviewSortField, overviewSortOrder, setOverviewSortField, setOverviewSortOrder)}
                          className="pb-3 font-semibold cursor-pointer select-none hover:text-gold-300"
                        >
                          Received {renderSortIndicator('createdAt', overviewSortField, overviewSortOrder)}
                        </th>
                        <th className="pb-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-500/10">
                      {overviewFilteredAndSortedQueries.slice(0, 8).map((q: any) => (
                        <tr key={q._id || q.id} className="hover:bg-cosmic-800/40">
                          <td className="py-3 font-bold text-white">{q.name}</td>
                          <td className="py-3 text-ivory-200/80">
                            <div>{q.phone}</div>
                            <div className="text-[10px] text-ivory-200/50">{q.email}</div>
                          </td>
                          <td className="py-3 text-gold-300">
                            {Array.isArray(q.services) ? q.services.join(', ') : q.services || 'General'}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                q.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : q.status === 'resolved'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              }`}
                            >
                              {q.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-3 text-ivory-200/60 whitespace-nowrap">
                            {new Date(q.createdAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => handleOpenQueryDetails(q)}
                              className="px-2.5 py-1 rounded-lg bg-cosmic-800 hover:bg-gold-500 hover:text-cosmic-950 text-gold-300 transition text-[11px] font-semibold cursor-pointer"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                      {overviewFilteredAndSortedQueries.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-ivory-200/50">
                            No consultation inquiries found matching filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: ASTROLOGERS MANAGEMENT
          ========================================================= */}
          {activeTab === 'astrologers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Astrologers Directory</h3>
                  <p className="text-xs text-ivory-200/60 mt-0.5">
                    Profiles added or edited here reflect live in the "Our Esteemed Astrologers" carousel on the website.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={exportAstrologersCSV}
                    className="px-3.5 py-2.5 rounded-xl bg-cosmic-900 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-cosmic-950 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    title="Export astrologers directory to CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={loadAstrologers}
                    className="p-2 rounded-xl bg-cosmic-900 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                    title="Refresh List"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleOpenAddAstrologer}
                    className="px-4 py-2.5 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Astrologer</span>
                  </button>
                </div>
              </div>

              {/* Filter, Sort & Search Toolbar */}
              <div className="bg-cosmic-900 border border-gold-500/20 rounded-2xl p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/60" />
                    <input
                      type="text"
                      value={astrologerSearch}
                      onChange={(e) => setAstrologerSearch(e.target.value)}
                      placeholder="Search name, specialization, language..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:outline-none focus:border-gold-400 text-xs"
                    />
                  </div>

                  {/* Availability Status Filter */}
                  <div>
                    <select
                      value={astrologerStatusFilter}
                      onChange={(e) => setAstrologerStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Availability Status</option>
                      <option value="active">Active Only</option>
                      <option value="offline">Offline Only</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <TableDateFilter
                      preset={astrologerDatePreset}
                      setPreset={setAstrologerDatePreset}
                      startDate={astrologerStartDate}
                      setStartDate={setAstrologerStartDate}
                      endDate={astrologerEndDate}
                      setEndDate={setAstrologerEndDate}
                    />
                  </div>

                  {/* Sort Selector */}
                  <div>
                    <select
                      value={`${astrologerSortField}-${astrologerSortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setAstrologerSortField(field as any);
                        setAstrologerSortOrder(order as any);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="createdAt-desc">Added: Newest First</option>
                      <option value="createdAt-asc">Added: Oldest First</option>
                      <option value="rating-desc">Rating: Highest First</option>
                      <option value="rating-asc">Rating: Lowest First</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                      <option value="experience-desc">Experience: High to Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gold-500/15 text-[11px] text-ivory-200/60">
                  <span>Showing {filteredAndSortedAstrologers.length} of {astrologers.length} astrologers</span>
                  {astrologerStatusFilter !== 'all' || astrologerSearch || astrologerDatePreset !== 'all' || astrologerStartDate || astrologerEndDate ? (
                    <button
                      onClick={() => {
                        setAstrologerStatusFilter('all');
                        setAstrologerSearch('');
                        setAstrologerDatePreset('all');
                        setAstrologerStartDate('');
                        setAstrologerEndDate('');
                      }}
                      className="text-gold-400 hover:underline cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  ) : null}
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center text-gold-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-semibold">Loading Astrologers...</span>
                </div>
              ) : filteredAndSortedAstrologers.length === 0 ? (
                <div className="col-span-full py-16 text-center text-ivory-200/60 bg-cosmic-900 border border-gold-500/20 rounded-2xl p-6">
                  {astrologers.length === 0
                    ? 'No astrologers found. Click "+ Add New Astrologer" above to create your first profile.'
                    : 'No astrologer profiles match the selected filters or date range.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredAndSortedAstrologers.map((astro: any) => (
                    <div
                      key={astro._id || astro.id}
                      className="bg-cosmic-900 border border-gold-500/30 rounded-2xl p-5 shadow-gold-card flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-gold-500/40 bg-cosmic-950 shrink-0 flex items-center justify-center">
                            <img
                              src={resolveAstrologerImage(astro)}
                              alt={astro.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const name = (astro.name || '').toLowerCase();
                                if (name.includes('gargi')) e.currentTarget.src = gargiJiImg;
                                else if (name.includes('nidhi')) e.currentTarget.src = nidhiJiImg;
                                else e.currentTarget.src = panditPranavImg;
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-base text-white">{astro.name}</h4>
                            <span className="text-xs text-gold-400 font-semibold block">{astro.specialization}</span>
                            <span className="text-[11px] text-ivory-200/60 block">{astro.experience}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleAstrologerAvailability(astro)}
                          title="Click to toggle availability"
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition cursor-pointer ${
                            astro.available
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {astro.available ? '● Active' : '○ Offline'}
                        </button>
                      </div>

                      <div className="space-y-1.5 text-xs text-ivory-200/70 border-t border-gold-500/15 pt-3 mb-4">
                        <div className="flex justify-between">
                          <span>Languages:</span>
                          <span className="text-white font-medium">{astro.languages || 'Hindi, English'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <span className="text-gold-300 font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                            {astro.rating} ({astro.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-gold-500/10">
                        <button
                          onClick={() => handleOpenEditAstrologer(astro)}
                          className="flex-1 py-2 px-3 rounded-xl bg-cosmic-800 hover:bg-gold-500 hover:text-cosmic-950 text-gold-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-gold-500/20"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteAstrologer(astro._id || astro.id, astro.name)}
                          className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 transition cursor-pointer text-xs"
                          title="Remove Astrologer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 3: BLOGS MANAGEMENT
          ========================================================= */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Vedic Wisdom & Blog Library</h3>
                  <p className="text-xs text-ivory-200/60 mt-0.5">
                    Articles created or edited here appear live in the `/blog` wisdom library.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={exportBlogsCSV}
                    className="px-3.5 py-2.5 rounded-xl bg-cosmic-900 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-cosmic-950 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    title="Export all filtered articles to CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={loadBlogs}
                    className="p-2 rounded-xl bg-cosmic-900 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                    title="Refresh List"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleOpenAddBlog}
                    className="px-4 py-2.5 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Blog Post</span>
                  </button>
                </div>
              </div>

              {/* Filter, Sort & Search Toolbar */}
              <div className="bg-cosmic-900 border border-gold-500/20 rounded-2xl p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/60" />
                    <input
                      type="text"
                      value={blogSearch}
                      onChange={(e) => setBlogSearch(e.target.value)}
                      placeholder="Search title, slug, author..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:outline-none focus:border-gold-400 text-xs"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <select
                      value={blogCategoryFilter}
                      onChange={(e) => setBlogCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Categories</option>
                      <option value="Astrology">Astrology</option>
                      <option value="Vastu Shastra">Vastu Shastra</option>
                      <option value="Spiritual Practices">Spiritual Practices</option>
                      <option value="Remedies">Remedies</option>
                      <option value="Kundli">Kundli</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <select
                      value={blogStatusFilter}
                      onChange={(e) => setBlogStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Publish Status</option>
                      <option value="published">Published Only</option>
                      <option value="draft">Drafts Only</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <TableDateFilter
                      preset={blogDatePreset}
                      setPreset={setBlogDatePreset}
                      startDate={blogStartDate}
                      setStartDate={setBlogStartDate}
                      endDate={blogEndDate}
                      setEndDate={setBlogEndDate}
                    />
                  </div>

                  {/* Sort Selector */}
                  <div>
                    <select
                      value={`${blogSortField}-${blogSortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setBlogSortField(field as any);
                        setBlogSortOrder(order as any);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="createdAt-desc">Date: Newest First</option>
                      <option value="createdAt-asc">Date: Oldest First</option>
                      <option value="title-asc">Title: A to Z</option>
                      <option value="title-desc">Title: Z to A</option>
                      <option value="views-desc">Views: Highest</option>
                      <option value="views-asc">Views: Lowest</option>
                      <option value="category-asc">Category: A to Z</option>
                      <option value="published-desc">Status: Published First</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gold-500/15 text-[11px] text-ivory-200/60">
                  <span>Showing {filteredAndSortedBlogs.length} of {blogs.length} articles</span>
                  {blogCategoryFilter !== 'all' || blogStatusFilter !== 'all' || blogSearch || blogDatePreset !== 'all' || blogStartDate || blogEndDate ? (
                    <button
                      onClick={() => {
                        setBlogCategoryFilter('all');
                        setBlogStatusFilter('all');
                        setBlogSearch('');
                        setBlogDatePreset('all');
                        setBlogStartDate('');
                        setBlogEndDate('');
                      }}
                      className="text-gold-400 hover:underline cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  ) : null}
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center text-gold-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-semibold">Loading Articles...</span>
                </div>
              ) : (
                <div className="bg-cosmic-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-gold-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gold-500/20 bg-cosmic-950/60 text-gold-400">
                          <th
                            onClick={() => toggleSort('title', blogSortField, blogSortOrder, setBlogSortField, setBlogSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Article Title {renderSortIndicator('title', blogSortField, blogSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('category', blogSortField, blogSortOrder, setBlogSortField, setBlogSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Category {renderSortIndicator('category', blogSortField, blogSortOrder)}
                          </th>
                          <th className="p-4 font-semibold">Author</th>
                          <th
                            onClick={() => toggleSort('createdAt', blogSortField, blogSortOrder, setBlogSortField, setBlogSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Date {renderSortIndicator('createdAt', blogSortField, blogSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('views', blogSortField, blogSortOrder, setBlogSortField, setBlogSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Views {renderSortIndicator('views', blogSortField, blogSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('published', blogSortField, blogSortOrder, setBlogSortField, setBlogSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Status {renderSortIndicator('published', blogSortField, blogSortOrder)}
                          </th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/10">
                        {filteredAndSortedBlogs.map((b: any) => (
                          <tr key={b._id || b.id} className="hover:bg-cosmic-800/40">
                            <td className="p-4">
                              <span className="font-bold text-white text-sm block max-w-sm truncate">
                                {b.title}
                              </span>
                              <span className="text-[10px] text-ivory-200/50 block font-mono">
                                /{b.slug}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-full bg-gold-500/15 text-gold-300 font-semibold text-[10px]">
                                {b.category || 'General'}
                              </span>
                            </td>
                            <td className="p-4 text-ivory-200/80">{b.author || 'Bhagya Netram'}</td>
                            <td className="p-4 text-ivory-200/60">{b.date}</td>
                            <td className="p-4 font-mono text-gold-300">{b.views || 0}</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  b.published
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/30'
                                }`}
                              >
                                {b.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  to="/blog"
                                  target="_blank"
                                  className="p-1.5 rounded-lg bg-cosmic-800 hover:bg-cosmic-700 text-ivory-200 transition"
                                  title="View on site"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  onClick={() => handleOpenEditBlog(b)}
                                  className="p-1.5 rounded-lg bg-cosmic-800 hover:bg-gold-500 hover:text-cosmic-950 text-gold-300 transition cursor-pointer"
                                  title="Edit"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(b._id || b.id, b.title)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredAndSortedBlogs.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-ivory-200/50">
                              No blog articles found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 4: QUERIES & INQUIRIES
          ========================================================= */}
          {activeTab === 'queries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Customer Inquiries</h3>
                  <p className="text-xs text-ivory-200/60 mt-0.5">
                    Real-time leads from booking modal, contact forms, and Vastu consultations.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportQueriesCSV()}
                    className="px-4 py-2 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-[1.02] transition"
                    title="Export filtered inquiries to CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={loadQueries}
                    className="p-2 rounded-xl bg-cosmic-900 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                    title="Refresh List"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Advanced Filter Bar & Search */}
              <div className="bg-cosmic-900/90 border border-gold-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Status Filter Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {['all', 'pending', 'contacted', 'in_progress', 'resolved'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setQueryStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition cursor-pointer border ${
                          queryStatusFilter === st
                            ? 'bg-gold-500 text-cosmic-950 border-gold-500 font-bold shadow-xs'
                            : 'bg-cosmic-950 text-ivory-200/70 border-gold-500/20 hover:bg-cosmic-800'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-gold-400 font-semibold ml-auto">
                    {filteredAndSortedQueries.length} of {queries.length} Inquiries
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-gold-500/15">
                  {/* Search Field */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gold-500/60 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={querySearch}
                      onChange={(e) => setQuerySearch(e.target.value)}
                      placeholder="Search name, phone, email, query..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Service Category Filter */}
                  <div>
                    <select
                      value={queryServiceFilter}
                      onChange={(e) => setQueryServiceFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Services</option>
                      <option value="horoscope">Horoscope &amp; Kundli</option>
                      <option value="vastu">Vastu Shastra</option>
                      <option value="palmistry">Palmistry (Hastarekha)</option>
                      <option value="tarot">Tarot Reading</option>
                      <option value="numerology">Numerology</option>
                      <option value="gemstone">Gemstone Guidance</option>
                      <option value="matching">Kundli Matching</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <TableDateFilter
                      preset={queryDatePreset}
                      setPreset={setQueryDatePreset}
                      startDate={queryStartDate}
                      setStartDate={setQueryStartDate}
                      endDate={queryEndDate}
                      setEndDate={setQueryEndDate}
                    />
                  </div>

                  {/* Sort Order Selector */}
                  <div>
                    <select
                      value={`${querySortField}-${querySortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setQuerySortField(field as any);
                        setQuerySortOrder(order as any);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="createdAt-desc">Received: Newest First</option>
                      <option value="createdAt-asc">Received: Oldest First</option>
                      <option value="name-asc">Client Name: A to Z</option>
                      <option value="name-desc">Client Name: Z to A</option>
                      <option value="services-asc">Service Category: A to Z</option>
                      <option value="status-asc">Status: Ascending</option>
                    </select>
                  </div>
                </div>

                {queryStatusFilter !== 'all' || queryServiceFilter !== 'all' || querySearch || queryDatePreset !== 'all' || queryStartDate || queryEndDate ? (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setQueryStatusFilter('all');
                        setQueryServiceFilter('all');
                        setQuerySearch('');
                        setQueryDatePreset('all');
                        setQueryStartDate('');
                        setQueryEndDate('');
                      }}
                      className="text-[11px] text-gold-400 hover:underline cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : null}
              </div>

              {loading ? (
                <div className="py-20 text-center text-gold-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-semibold">Loading Inquiries...</span>
                </div>
              ) : (
                <div className="bg-cosmic-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-gold-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gold-500/20 bg-cosmic-950/60 text-gold-400">
                          <th
                            onClick={() => toggleSort('createdAt', querySortField, querySortOrder, setQuerySortField, setQuerySortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Received {renderSortIndicator('createdAt', querySortField, querySortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('name', querySortField, querySortOrder, setQuerySortField, setQuerySortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Client Name {renderSortIndicator('name', querySortField, querySortOrder)}
                          </th>
                          <th className="p-4 font-semibold">Contact</th>
                          <th
                            onClick={() => toggleSort('services', querySortField, querySortOrder, setQuerySortField, setQuerySortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Service Requested {renderSortIndicator('services', querySortField, querySortOrder)}
                          </th>
                          <th className="p-4 font-semibold">Astrologer</th>
                          <th
                            onClick={() => toggleSort('status', querySortField, querySortOrder, setQuerySortField, setQuerySortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Status {renderSortIndicator('status', querySortField, querySortOrder)}
                          </th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/10">
                        {filteredAndSortedQueries.map((q: any) => (
                          <tr key={q._id || q.id} className="hover:bg-cosmic-800/40">
                            <td className="p-4 text-ivory-200/60 whitespace-nowrap">
                              {new Date(q.createdAt).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="p-4 font-bold text-white whitespace-nowrap">{q.name}</td>
                            <td className="p-4 text-ivory-200/90 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 font-medium">
                                <Phone className="w-3 h-3 text-gold-400" />
                                <span>{q.phone}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-ivory-200/50 mt-0.5">
                                <Mail className="w-3 h-3 text-gold-500/60" />
                                <span>{q.email}</span>
                              </div>
                            </td>
                            <td className="p-4 text-gold-300 font-medium">
                              {Array.isArray(q.services) ? q.services.join(', ') : q.services || 'General'}
                            </td>
                            <td className="p-4 text-ivory-200/80">{q.astrologerName || 'Any Available'}</td>
                            <td className="p-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  q.status === 'pending'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : q.status === 'resolved'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : q.status === 'contacted'
                                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    : 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/30'
                                }`}
                              >
                                {q.status || 'pending'}
                              </span>
                            </td>
                            <td className="p-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenQueryDetails(q)}
                                  className="px-3 py-1.5 rounded-lg bg-cosmic-800 hover:bg-gold-500 hover:text-cosmic-950 text-gold-300 font-semibold text-xs transition cursor-pointer"
                                >
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleDeleteQuery(q._id || q.id)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredAndSortedQueries.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-ivory-200/50">
                              No inquiries found matching this criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 5: USER ACCOUNTS
          ========================================================= */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Registered User Accounts</h3>
                  <p className="text-xs text-ivory-200/60 mt-0.5">
                    Manage client profiles, palmistry AI scanning credits, and active permissions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportUsersCSV}
                    className="px-4 py-2 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-[1.02] transition"
                    title="Export user accounts to CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Users CSV</span>
                  </button>
                  <button
                    onClick={loadUsers}
                    className="p-2 rounded-xl bg-cosmic-900 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                    title="Refresh"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filter Bar & Search */}
              <div className="bg-cosmic-900/90 border border-gold-500/30 rounded-2xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {/* Search input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gold-500/60 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search name, phone, email..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Status Filter */}
                  <div>
                    <select
                      value={userStatusFilter}
                      onChange={(e) => setUserStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Account Status</option>
                      <option value="active">Active Only</option>
                      <option value="suspended">Suspended Only</option>
                    </select>
                  </div>

                  {/* Credits Filter */}
                  <div>
                    <select
                      value={userCreditsFilter}
                      onChange={(e) => setUserCreditsFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Credits</option>
                      <option value="has_credits">Has Credits (&gt;0)</option>
                      <option value="zero_credits">Zero Credits (0)</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <TableDateFilter
                      preset={userDatePreset}
                      setPreset={setUserDatePreset}
                      startDate={userStartDate}
                      setStartDate={setUserStartDate}
                      endDate={userEndDate}
                      setEndDate={setUserEndDate}
                    />
                  </div>

                  {/* Sort Selector */}
                  <div>
                    <select
                      value={`${userSortField}-${userSortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setUserSortField(field as any);
                        setUserSortOrder(order as any);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="createdAt-desc">Joined: Newest First</option>
                      <option value="createdAt-asc">Joined: Oldest First</option>
                      <option value="name-asc">User Name: A to Z</option>
                      <option value="name-desc">User Name: Z to A</option>
                      <option value="palmistryCredits-desc">Credits: High to Low</option>
                      <option value="palmistryCredits-asc">Credits: Low to High</option>
                      <option value="status-asc">Status: Ascending</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gold-500/15 text-[11px] text-ivory-200/60">
                  <span>Showing {filteredAndSortedUsers.length} of {users.length} registered users</span>
                  {userStatusFilter !== 'all' || userCreditsFilter !== 'all' || userSearch || userDatePreset !== 'all' || userStartDate || userEndDate ? (
                    <button
                      onClick={() => {
                        setUserStatusFilter('all');
                        setUserCreditsFilter('all');
                        setUserSearch('');
                        setUserDatePreset('all');
                        setUserStartDate('');
                        setUserEndDate('');
                      }}
                      className="text-gold-400 hover:underline cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  ) : null}
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center text-gold-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-semibold">Loading User Accounts...</span>
                </div>
              ) : (
                <div className="bg-cosmic-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-gold-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gold-500/20 bg-cosmic-950/60 text-gold-400">
                          <th
                            onClick={() => toggleSort('name', userSortField, userSortOrder, setUserSortField, setUserSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Name {renderSortIndicator('name', userSortField, userSortOrder)}
                          </th>
                          <th className="p-4 font-semibold">Email</th>
                          <th className="p-4 font-semibold">Phone</th>
                          <th
                            onClick={() => toggleSort('palmistryCredits', userSortField, userSortOrder, setUserSortField, setUserSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Palmistry Credits {renderSortIndicator('palmistryCredits', userSortField, userSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('status', userSortField, userSortOrder, setUserSortField, setUserSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Status {renderSortIndicator('status', userSortField, userSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('createdAt', userSortField, userSortOrder, setUserSortField, setUserSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Joined Date {renderSortIndicator('createdAt', userSortField, userSortOrder)}
                          </th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/10">
                        {filteredAndSortedUsers.map((u: any) => (
                          <tr key={u._id || u.id} className="hover:bg-cosmic-800/40">
                            <td className="p-4 font-bold text-white">{u.name}</td>
                            <td className="p-4 text-ivory-200/80">{u.email}</td>
                            <td className="p-4 text-ivory-200/90 font-mono">{u.phone}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-300 font-bold text-xs">
                                {u.palmistryCredits ?? 3} Credits
                              </span>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  u.status === 'suspended'
                                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {u.status || 'active'}
                              </span>
                            </td>
                            <td className="p-4 text-ivory-200/60">
                              {new Date(u.createdAt).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditUser(u)}
                                  className="px-3 py-1.5 rounded-lg bg-cosmic-800 hover:bg-gold-500 hover:text-cosmic-950 text-gold-300 transition text-xs font-semibold cursor-pointer"
                                >
                                  Adjust
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(u._id || u.id, u.name)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition cursor-pointer"
                                  title="Delete Account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredAndSortedUsers.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-ivory-200/50">
                              No user accounts found matching this criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 6: CLIENT REVIEWS & TESTIMONIALS MANAGEMENT
          ========================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Client Experiences & Reviews</h3>
                  <p className="text-xs text-ivory-200/60 mt-0.5">
                    Manage testimonials featured in the "What Our Clients Say" section on the home page.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={exportReviewsCSV}
                    className="px-3.5 py-2.5 rounded-xl bg-cosmic-900 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-cosmic-950 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                    title="Export all filtered reviews to CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={loadReviews}
                    className="p-2 rounded-xl bg-cosmic-900 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                    title="Refresh List"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleOpenAddReview}
                    className="px-4 py-2.5 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Review</span>
                  </button>
                </div>
              </div>

              {/* Filter, Sort & Search Toolbar */}
              <div className="bg-cosmic-900 border border-gold-500/20 rounded-2xl p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/60" />
                    <input
                      type="text"
                      value={reviewSearch}
                      onChange={(e) => setReviewSearch(e.target.value)}
                      placeholder="Search name, city, quote..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:outline-none focus:border-gold-400 text-xs"
                    />
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <select
                      value={reviewRatingFilter}
                      onChange={(e) => setReviewRatingFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Star Ratings</option>
                      <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                      <option value="3">⭐⭐⭐ (3 Stars)</option>
                      <option value="2">⭐⭐ (2 Stars)</option>
                      <option value="1">⭐ (1 Star)</option>
                    </select>
                  </div>

                  {/* Visibility Status Filter */}
                  <div>
                    <select
                      value={reviewStatusFilter}
                      onChange={(e) => setReviewStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Visibility Status</option>
                      <option value="active">Active (Visible on Site)</option>
                      <option value="hidden">Hidden (Draft/Archived)</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <TableDateFilter
                      preset={reviewDatePreset}
                      setPreset={setReviewDatePreset}
                      startDate={reviewStartDate}
                      setStartDate={setReviewStartDate}
                      endDate={reviewEndDate}
                      setEndDate={setReviewEndDate}
                    />
                  </div>

                  {/* Sort Selector */}
                  <div>
                    <select
                      value={`${reviewSortField}-${reviewSortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setReviewSortField(field as any);
                        setReviewSortOrder(order as any);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="createdAt-desc">Date: Newest First</option>
                      <option value="createdAt-asc">Date: Oldest First</option>
                      <option value="rating-desc">Rating: Highest First</option>
                      <option value="rating-asc">Rating: Lowest First</option>
                      <option value="name-asc">Client Name: A to Z</option>
                      <option value="name-desc">Client Name: Z to A</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-gold-500/15 text-[11px] text-ivory-200/60">
                  <span>Showing {filteredAndSortedReviews.length} of {reviews.length} reviews</span>
                  {reviewRatingFilter !== 'all' || reviewStatusFilter !== 'all' || reviewSearch || reviewDatePreset !== 'all' || reviewStartDate || reviewEndDate ? (
                    <button
                      onClick={() => {
                        setReviewRatingFilter('all');
                        setReviewStatusFilter('all');
                        setReviewSearch('');
                        setReviewDatePreset('all');
                        setReviewStartDate('');
                        setReviewEndDate('');
                      }}
                      className="text-gold-400 hover:underline cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  ) : null}
                </div>
              </div>

              {loading ? (
                <div className="py-20 text-center text-gold-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-semibold">Loading Reviews...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedReviews.map((review: any) => (
                      <div
                        key={review._id || review.id}
                        className="bg-cosmic-900 border border-gold-500/30 rounded-2xl p-6 shadow-gold-card flex flex-col justify-between relative overflow-hidden"
                      >
                        <div>
                          {/* Card Top: Stars and Status Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1 text-gold-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(review.rating || 5)
                                      ? 'fill-gold-400 text-gold-400'
                                      : 'text-cosmic-700'
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-gold-300 font-bold ml-1.5">
                                {review.rating || 5}.0
                              </span>
                            </div>

                            <button
                              onClick={() => handleToggleReviewActive(review)}
                              title="Click to toggle visibility on website"
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition cursor-pointer ${
                                review.active !== false
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-zinc-600/30 text-zinc-300 border border-zinc-500/30'
                              }`}
                            >
                              {review.active !== false ? '• Active' : '• Hidden'}
                            </button>
                          </div>

                          {/* Quote text */}
                          <blockquote className="font-editorial italic text-base text-ivory-100/95 leading-relaxed mb-6">
                            "{review.text}"
                          </blockquote>
                        </div>

                        {/* Card Bottom: Client Info & Actions */}
                        <div>
                          <div className="flex items-center justify-between pt-4 border-t border-gold-500/20 mb-4">
                            <div className="flex items-center gap-3">
                              {/* <div className="w-10 h-10 rounded-full bg-cosmic-950 border border-gold-500/40 text-gold-300 font-display font-bold flex items-center justify-center text-xs shadow-inner">
                                {review.initials || (review.name ? review.name.slice(0, 2).toUpperCase() : '✦')}
                              </div> */}
                              <div>
                                <h4 className="font-display font-bold text-white text-sm">
                                  {review.name}
                                </h4>
                                <span className="text-[11px] text-ivory-200/65 block">
                                  {review.location || 'India'}
                                </span>
                              </div>
                            </div>
                            <span className="text-[11px] text-gold-400/80 font-medium">
                              {review.date || 'Recently'}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditReview(review)}
                              className="flex-1 py-2 px-3 rounded-xl bg-cosmic-800 hover:bg-gold-500 hover:text-cosmic-950 text-gold-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition border border-gold-500/20 cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review._id || review.id, review.name)}
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition cursor-pointer"
                              title="Delete Review"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  {filteredAndSortedReviews.length === 0 && (
                    <div className="col-span-full py-16 text-center text-ivory-200/50 bg-cosmic-900/50 rounded-2xl border border-gold-500/20">
                      {reviews.length === 0
                        ? 'No reviews found. Click "+ Add New Review" to publish a client testimonial.'
                        : 'No reviews found matching your filter criteria.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 7: SUB-ADMINISTRATOR MANAGEMENT
          ========================================================= */}
          {activeTab === 'subadmins' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Sub-Administrator Roster</h3>
                  <p className="text-xs text-ivory-200/60 mt-0.5">
                    Manage administrative team members, grant permissions, or remove access.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={loadSubadmins}
                    className="p-2 rounded-xl bg-cosmic-900 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                    title="Refresh List"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSubadminModalTab('add');
                      setSubadminsModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Sub-Admin</span>
                  </button>
                </div>
              </div>

              {subadminsLoading ? (
                <div className="py-20 text-center text-gold-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-semibold">Loading Sub-Admins...</span>
                </div>
              ) : (
                <div className="bg-cosmic-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-gold-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gold-500/20 bg-cosmic-950/60 text-gold-400">
                          <th className="p-4 font-semibold">Administrator</th>
                          <th className="p-4 font-semibold">Role</th>
                          <th className="p-4 font-semibold">Permissions</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold">Created Date</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/10">
                        {subadmins.map((sub: any) => {
                          const isPrimary = sub.role === 'superadmin' || sub.email === 'admin@bhagyanetram.com';
                          return (
                            <tr key={sub._id || sub.id} className="hover:bg-cosmic-800/40">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-gold-500/20 text-gold-300 font-bold flex items-center justify-center text-xs shrink-0 border border-gold-500/30">
                                    {sub.name ? sub.name.slice(0, 2).toUpperCase() : 'AD'}
                                  </div>
                                  <div>
                                    <div className="font-bold text-white text-sm flex items-center gap-2">
                                      <span>{sub.name}</span>
                                      {isPrimary && (
                                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold">
                                          Master Superadmin
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] text-ivory-200/60 block">{sub.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                  sub.role === 'superadmin'
                                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                }`}>
                                  {sub.role || 'subadmin'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {Array.isArray(sub.permissions) && sub.permissions.length > 0 ? (
                                    sub.permissions.map((p: string) => (
                                      <span key={p} className="px-2 py-0.5 rounded-md bg-cosmic-950 text-[10px] text-ivory-200/80 border border-gold-500/15">
                                        {p}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-ivory-200/50 text-[10px]">All Modules</span>
                                  )}
                                </div>
                              </td>
                              <td className="p-4">
                                <button
                                  disabled={isPrimary}
                                  onClick={() => handleToggleSubadminStatus(sub)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                                    sub.status === 'active'
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                      : 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/40 hover:bg-zinc-500/30'
                                  } ${isPrimary ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
                                  title={isPrimary ? 'Primary Master account cannot be toggled' : 'Click to toggle status'}
                                >
                                  {sub.status || 'active'}
                                </button>
                              </td>
                              <td className="p-4 text-ivory-200/60">
                                {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                }) : 'Primary'}
                              </td>
                              <td className="p-4 text-right">
                                {!isPrimary && sub.email !== (adminUser.email || '').toLowerCase() ? (
                                  <button
                                    onClick={() => handleDeleteSubadmin(sub._id || sub.id, sub.name)}
                                    className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/30 text-red-300 transition cursor-pointer border border-red-500/20"
                                    title="Remove Sub-Admin"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-ivory-200/40 italic">Protected</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                        {subadmins.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-ivory-200/50">
                              No sub-admin accounts configured.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 8: ACTIVITY & AUDIT LOGS
          ========================================================= */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="font-display font-bold text-xl text-white">
                      Administrative Activity &amp; Audit Logs
                    </h3>
                    {isLogsSuperAdmin ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gold-500/20 text-gold-300 border border-gold-500/40 flex items-center gap-1.5 shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                        <span>Super Admin (Full Organization Trail)</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cosmic-800 text-gold-300 border border-gold-500/30 flex items-center gap-1.5 shadow-xs">
                        <ShieldAlert className="w-3.5 h-3.5 text-gold-400" />
                        <span>Sub-Admin (My Activity Only)</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ivory-200/60">
                    {isLogsSuperAdmin
                      ? 'Comprehensive organization-wide audit trail. Super admin view displays every modification, deletion, and addition across the system.'
                      : 'Personal administrative audit trail. Displays all actions, modifications, and updates performed by your account.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportLogsCSV}
                    className="px-4 py-2 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-[1.02] transition"
                    title="Export filtered activity logs to CSV"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={loadLogs}
                    className="p-2 rounded-xl bg-cosmic-900 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                    title="Refresh Audit Logs"
                  >
                    <RefreshCw className={`w-4 h-4 ${logsLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-cosmic-900/90 border border-gold-500/25 rounded-2xl p-4 shadow-gold-card">
                  <span className="text-[11px] uppercase tracking-wider text-ivory-200/60 font-semibold block mb-1">
                    Tracked Events
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-display font-bold text-white">
                      {logs.length}
                    </span>
                    <span className="text-xs text-gold-400 font-medium">Recorded</span>
                  </div>
                </div>

                <div className="bg-cosmic-900/90 border border-gold-500/25 rounded-2xl p-4 shadow-gold-card">
                  <span className="text-[11px] uppercase tracking-wider text-ivory-200/60 font-semibold block mb-1">
                    Content Updates
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-display font-bold text-white">
                      {logs.filter((l) => l.category === 'blogs' || l.category === 'astrologers').length}
                    </span>
                    <span className="text-xs text-sky-400 font-medium">Blogs &amp; Astrologers</span>
                  </div>
                </div>

                <div className="bg-cosmic-900/90 border border-gold-500/25 rounded-2xl p-4 shadow-gold-card">
                  <span className="text-[11px] uppercase tracking-wider text-ivory-200/60 font-semibold block mb-1">
                    Inquiries &amp; Reviews
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-display font-bold text-white">
                      {logs.filter((l) => l.category === 'queries' || l.category === 'reviews').length}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">Clients</span>
                  </div>
                </div>

                <div className="bg-cosmic-900/90 border border-gold-500/25 rounded-2xl p-4 shadow-gold-card">
                  <span className="text-[11px] uppercase tracking-wider text-ivory-200/60 font-semibold block mb-1">
                    Security &amp; Auth
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-display font-bold text-white">
                      {logs.filter((l) => l.category === 'security' || l.category === 'subadmins').length}
                    </span>
                    <span className="text-xs text-purple-400 font-medium">Accounts</span>
                  </div>
                </div>
              </div>

              {/* Advanced Filter Toolbar */}
              <div className="bg-cosmic-900/90 border border-gold-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { key: 'all', label: 'All Modules' },
                      { key: 'astrologers', label: 'Astrologers' },
                      { key: 'blogs', label: 'Blogs' },
                      { key: 'queries', label: 'Inquiries' },
                      { key: 'reviews', label: 'Reviews' },
                      { key: 'users', label: 'Users' },
                      { key: 'subadmins', label: 'Sub-Admins' },
                      { key: 'security', label: 'Security' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setLogsCategoryFilter(item.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                          logsCategoryFilter === item.key
                            ? 'bg-gold-500 text-cosmic-950 border-gold-500 font-bold shadow-xs'
                            : 'bg-cosmic-950 text-ivory-200/70 border-gold-500/20 hover:bg-cosmic-800'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-gold-400 font-semibold ml-auto">
                    {filteredAndSortedLogs.length} of {logs.length} Events
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-gold-500/15">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gold-500/60 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={logsSearch}
                      onChange={(e) => setLogsSearch(e.target.value)}
                      placeholder="Search log description, admin, action, target..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  {/* Action Filter */}
                  <div>
                    <select
                      value={logsActionFilter}
                      onChange={(e) => setLogsActionFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="all">All Action Types</option>
                      <option value="create">Created / Added (CREATE_*)</option>
                      <option value="update">Updated / Modified (UPDATE_*)</option>
                      <option value="delete">Deleted / Removed (DELETE_*)</option>
                      <option value="status">Status Changes (STATUS_*)</option>
                      <option value="security">Security &amp; Auth (LOGIN, PASSWORD)</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <TableDateFilter
                      preset={logsDatePreset}
                      setPreset={setLogsDatePreset}
                      startDate={logsStartDate}
                      setStartDate={setLogsStartDate}
                      endDate={logsEndDate}
                      setEndDate={setLogsEndDate}
                    />
                  </div>

                  {/* Sort Selector */}
                  <div>
                    <select
                      value={`${logsSortField}-${logsSortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setLogsSortField(field as any);
                        setLogsSortOrder(order as any);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="createdAt-desc">Timestamp: Newest First</option>
                      <option value="createdAt-asc">Timestamp: Oldest First</option>
                      <option value="adminName-asc">Admin Name: A to Z</option>
                      <option value="adminName-desc">Admin Name: Z to A</option>
                      <option value="category-asc">Category: A to Z</option>
                      <option value="action-asc">Action: A to Z</option>
                    </select>
                  </div>
                </div>

                {logsCategoryFilter !== 'all' || logsActionFilter !== 'all' || logsSearch || logsDatePreset !== 'all' || logsStartDate || logsEndDate ? (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        setLogsCategoryFilter('all');
                        setLogsActionFilter('all');
                        setLogsSearch('');
                        setLogsDatePreset('all');
                        setLogsStartDate('');
                        setLogsEndDate('');
                      }}
                      className="text-[11px] text-gold-400 hover:underline cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : null}
              </div>

              {/* Audit Table */}
              {logsLoading ? (
                <div className="py-20 text-center text-gold-400 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin mb-2" />
                  <span className="text-xs font-semibold">Loading Activity Logs...</span>
                </div>
              ) : (
                <div className="bg-cosmic-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-gold-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gold-500/20 bg-cosmic-950/60 text-gold-400">
                          <th
                            onClick={() => toggleSort('createdAt', logsSortField, logsSortOrder, setLogsSortField, setLogsSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Timestamp {renderSortIndicator('createdAt', logsSortField, logsSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('adminName', logsSortField, logsSortOrder, setLogsSortField, setLogsSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Admin User {renderSortIndicator('adminName', logsSortField, logsSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('category', logsSortField, logsSortOrder, setLogsSortField, setLogsSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Category {renderSortIndicator('category', logsSortField, logsSortOrder)}
                          </th>
                          <th
                            onClick={() => toggleSort('action', logsSortField, logsSortOrder, setLogsSortField, setLogsSortOrder)}
                            className="p-4 font-semibold cursor-pointer select-none hover:text-gold-300"
                          >
                            Action {renderSortIndicator('action', logsSortField, logsSortOrder)}
                          </th>
                          <th className="p-4 font-semibold">Modification Details</th>
                          <th className="p-4 font-semibold">Target Resource</th>
                          <th className="p-4 font-semibold">IP / Device</th>
                          <th className="p-4 font-semibold text-right">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-500/10 text-ivory-100">
                        {filteredAndSortedLogs.map((log: any) => {
                          const isSuper = (log.adminRole || '').toLowerCase() === 'superadmin' || log.adminEmail === 'admin@bhagyanetram.com';
                          const actionUpper = (log.action || '').toUpperCase();
                          const isCreate = actionUpper.includes('CREATE') || actionUpper.includes('INIT');
                          const isDelete = actionUpper.includes('DELETE') || actionUpper.includes('REMOVE');
                          const isUpdate = actionUpper.includes('UPDATE') || actionUpper.includes('CHANGE');
                          const isAuth = actionUpper.includes('LOGIN') || actionUpper.includes('PASSWORD');

                          return (
                            <tr key={log._id || log.id || Math.random()} className="hover:bg-cosmic-800/40 transition">
                              {/* Timestamp */}
                              <td className="p-4 whitespace-nowrap">
                                <div className="text-white font-medium">
                                  {new Date(log.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </div>
                                <div className="text-[10px] text-ivory-200/50 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3 text-gold-400/60" />
                                  <span>
                                    {new Date(log.createdAt).toLocaleTimeString('en-IN', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>
                              </td>

                              {/* Admin */}
                              <td className="p-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-cosmic-950 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-[10px]">
                                    {(log.adminName || 'A').slice(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                                      <span>{log.adminName || 'Admin'}</span>
                                      {isSuper ? (
                                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                                          SUPER ADMIN
                                        </span>
                                      ) : (
                                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                          SUB ADMIN
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-ivory-200/60 block">
                                      {log.adminEmail}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Category */}
                              <td className="p-4 whitespace-nowrap">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cosmic-950 border border-gold-500/20 text-gold-300">
                                  {log.category || 'system'}
                                </span>
                              </td>

                              {/* Action */}
                              <td className="p-4 whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                                    isCreate
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : isDelete
                                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                      : isUpdate
                                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                      : isAuth
                                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                      : 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                                  }`}
                                >
                                  {log.action}
                                </span>
                              </td>

                              {/* Description */}
                              <td className="p-4 max-w-xs md:max-w-md">
                                <p className="text-xs text-ivory-100/90 leading-snug">
                                  {log.description}
                                </p>
                              </td>

                              {/* Target */}
                              <td className="p-4 whitespace-nowrap">
                                {log.targetTitle ? (
                                  <span className="px-2 py-0.5 rounded-lg bg-cosmic-950/80 text-gold-300 border border-gold-500/20 text-[11px] font-medium">
                                    {log.targetTitle}
                                  </span>
                                ) : (
                                  <span className="text-ivory-200/40 text-[11px]">—</span>
                                )}
                              </td>

                              {/* IP */}
                              <td className="p-4 whitespace-nowrap text-[11px] text-ivory-200/60 font-mono">
                                {log.ip || '127.0.0.1'}
                              </td>

                              {/* Details button */}
                              <td className="p-4 text-right whitespace-nowrap">
                                <button
                                  onClick={() => setSelectedLogDetail(log)}
                                  className="p-1.5 rounded-lg bg-cosmic-950 border border-gold-500/20 text-gold-400 hover:text-white hover:bg-gold-500/20 transition cursor-pointer"
                                  title="Inspect Log Metadata"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        {filteredAndSortedLogs.length === 0 && (
                          <tr>
                            <td colSpan={8} className="p-12 text-center text-ivory-200/50">
                              <History className="w-8 h-8 text-gold-500/40 mx-auto mb-2" />
                              <p className="text-sm font-semibold text-white">No activity logs found</p>
                              <p className="text-xs text-ivory-200/60 mt-1">
                                {isLogsSuperAdmin
                                  ? 'No administrative changes match the selected filter criteria.'
                                  : 'No activity records found under your sub-admin account for this filter.'}
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* =========================================================
          MODAL: ADD / EDIT ASTROLOGER
      ========================================================= */}
      {astrologerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-5">
              <h3 className="font-display font-bold text-lg text-white">
                {editingAstrologer ? 'Edit Astrologer Profile' : 'Add New Astrologer'}
              </h3>
              <button
                onClick={() => setAstrologerModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAstrologer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={astrologerForm.name}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, name: e.target.value })}
                    placeholder="e.g. Pandit Pranav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Title / Designation</label>
                  <input
                    type="text"
                    value={astrologerForm.title}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, title: e.target.value })}
                    placeholder="e.g. Senior Vedic Astrologer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Specialization *</label>
                  <input
                    type="text"
                    required
                    value={astrologerForm.specialization}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, specialization: e.target.value })}
                    placeholder="e.g. Vedic Astrology, Vastu, Palmistry"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Experience *</label>
                  <input
                    type="text"
                    required
                    value={astrologerForm.experience}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, experience: e.target.value })}
                    placeholder="e.g. 10 Years Experience"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Languages</label>
                  <input
                    type="text"
                    value={astrologerForm.languages}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, languages: e.target.value })}
                    placeholder="Hindi, English"
                    className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={astrologerForm.rating}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, rating: parseFloat(e.target.value) || 4.9 })}
                    className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Reviews Count</label>
                  <input
                    type="text"
                    value={astrologerForm.reviews}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, reviews: e.target.value })}
                    placeholder="e.g. 5K+"
                    className="w-full px-3 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-2 flex items-center justify-between">
                  <span>Astrologer Profile Photo</span>
                  <span className="text-[10px] text-emerald-400 font-medium">● Stored directly in MongoDB</span>
                </label>

                {astrologerForm.image ? (
                  /* Display Loaded Photo with Change & Remove actions */
                  <div className="p-4 rounded-2xl bg-cosmic-950 border border-gold-500/30 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gold-500/60 bg-cosmic-900 shrink-0 shadow-gold-glow flex items-center justify-center relative">
                      <img
                        src={astrologerForm.image}
                        alt="Astrologer Photo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const name = (astrologerForm.name || '').toLowerCase();
                          if (name.includes('gargi')) e.currentTarget.src = gargiJiImg;
                          else if (name.includes('nidhi')) e.currentTarget.src = nidhiJiImg;
                          else e.currentTarget.src = panditPranavImg;
                        }}
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="text-xs text-ivory-100 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Photo ready to save in MongoDB</span>
                      </div>
                      <p className="text-[11px] text-ivory-200/60 leading-relaxed">
                        This image will be stored directly inside MongoDB so it appears reliably across all screens.
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <label className="py-1.5 px-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-cosmic-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => setAstrologerForm({ ...astrologerForm, image: '' })}
                          className="py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold cursor-pointer transition"
                        >
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Upload Dropzone when no photo is loaded */
                  <label className="border-2 border-dashed border-gold-500/40 hover:border-gold-400 bg-cosmic-950/70 hover:bg-cosmic-950 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition group">
                    <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                      Click to upload Astrologer Photo
                    </span>
                    <span className="text-xs text-ivory-200/60 mt-1">
                      Supports JPG, PNG, WEBP • Auto-compressed & saved into MongoDB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">Short Biography & Expertise</label>
                <textarea
                  rows={3}
                  value={astrologerForm.bio}
                  onChange={(e) => setAstrologerForm({ ...astrologerForm, bio: e.target.value })}
                  placeholder="Highlights of Vedic lineage, specializations, remedies..."
                  className="w-full px-3.5 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                  <input
                    type="checkbox"
                    checked={astrologerForm.available}
                    onChange={(e) => setAstrologerForm({ ...astrologerForm, available: e.target.checked })}
                    className="w-4 h-4 rounded text-gold-500 focus:ring-gold-400 bg-cosmic-950"
                  />
                  <span>Active & Available for Consultation</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setAstrologerModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-cosmic-800 text-ivory-200 text-xs font-semibold hover:bg-cosmic-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl gold-btn text-cosmic-950 text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingAstrologer ? 'Update Astrologer' : 'Add Astrologer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: ADD / EDIT BLOG
      ========================================================= */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-5">
              <h3 className="font-display font-bold text-lg text-white">
                {editingBlog ? 'Edit Blog Article' : 'Write New Wisdom Blog Post'}
              </h3>
              <button
                onClick={() => setBlogModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Vastu Guidelines for Auspicious Home Entrances"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  >
                    <option value="Astrology">Astrology</option>
                    <option value="Vastu Shastra">Vastu Shastra</option>
                    <option value="Spiritual Practices">Spiritual Practices</option>
                    <option value="Remedies">Remedies & Gemstones</option>
                    <option value="Kundli">Kundli & Planets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="e.g. Pandit Pranav / Bhagya Netram"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="1-2 sentences summarizing the article for the cards..."
                  className="w-full px-3.5 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">Full Article Content *</label>
                <textarea
                  rows={8}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Full text of the blog. Markdown / paragraphs are supported..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs font-mono leading-relaxed focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Cover Image</label>
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="blog1.jpeg or image URL"
                    className="w-full px-3.5 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    placeholder="Vastu, Entrance, Crystals"
                    className="w-full px-3.5 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="w-4 h-4 rounded text-gold-500 focus:ring-gold-400 bg-cosmic-950"
                  />
                  <span>Publish Immediately (Visible to readers)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-cosmic-800 text-ivory-200 text-xs font-semibold hover:bg-cosmic-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl gold-btn text-cosmic-950 text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingBlog ? 'Update Post' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: QUERY DETAILS & STATUS INSPECTOR
      ========================================================= */}
      {queryModalOpen && selectedQuery && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider block">
                  Customer Consultation Inquiry
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {selectedQuery.name}
                </h3>
              </div>
              <button
                onClick={() => setQueryModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateQueryStatus} className="space-y-4">
              <div className="bg-cosmic-950 p-4 rounded-2xl border border-gold-500/20 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-gold-500/10">
                  <span className="text-ivory-200/60">Phone:</span>
                  <a href={`tel:${selectedQuery.phone}`} className="font-mono text-gold-300 font-bold hover:underline">
                    {selectedQuery.phone}
                  </a>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-gold-500/10">
                  <span className="text-ivory-200/60">Email:</span>
                  <a href={`mailto:${selectedQuery.email}`} className="text-white hover:underline">
                    {selectedQuery.email}
                  </a>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-gold-500/10">
                  <span className="text-ivory-200/60">Service(s):</span>
                  <span className="text-gold-400 font-semibold text-right">
                    {Array.isArray(selectedQuery.services) ? selectedQuery.services.join(', ') : selectedQuery.services}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-gold-500/10">
                  <span className="text-ivory-200/60">Requested Astrologer:</span>
                  <span className="text-white">{selectedQuery.astrologerName || 'Any Available'}</span>
                </div>

                {selectedQuery.date && (
                  <div className="flex justify-between items-center py-1 border-b border-gold-500/10">
                    <span className="text-ivory-200/60">Preferred Appointment:</span>
                    <span className="text-white">
                      {new Date(selectedQuery.date).toLocaleDateString()} at {selectedQuery.time || 'Flexible'}
                    </span>
                  </div>
                )}

                <div className="pt-2">
                  <span className="text-ivory-200/60 block mb-1">Client Message:</span>
                  <p className="bg-cosmic-900/90 p-3 rounded-xl border border-gold-500/15 text-ivory-100 text-xs leading-relaxed italic">
                    "{selectedQuery.message || 'No additional note provided by client.'}"
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                  Update Lead Follow-up Status
                </label>
                <select
                  value={queryStatusUpdate}
                  onChange={(e) => setQueryStatusUpdate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                >
                  <option value="pending">Pending (New)</option>
                  <option value="contacted">Contacted (In Discussion)</option>
                  <option value="in_progress">In Progress (Audit Scheduled)</option>
                  <option value="resolved">Resolved (Consultation Done)</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Admin Internal Notes */}
              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                  Admin Follow-up Notes
                </label>
                <textarea
                  rows={3}
                  value={queryAdminNotes}
                  onChange={(e) => setQueryAdminNotes(e.target.value)}
                  placeholder="Record outcome of WhatsApp/Call discussion or next steps..."
                  className="w-full px-3.5 py-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold-500/20">
                <a
                  href={`https://wa.me/${selectedQuery.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(
                    selectedQuery.name
                  )},%20this%20is%20from%20BhagyaNetram%20regarding%20your%20consultation%20request.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Client</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQueryModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-cosmic-800 text-ivory-200 text-xs font-semibold hover:bg-cosmic-700"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 rounded-xl gold-btn text-cosmic-950 text-xs font-bold shadow-md cursor-pointer"
                  >
                    {actionLoading ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: USER CREDITS & STATUS ADJUSTER
      ========================================================= */}
      {userModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider block">
                  User Account Controls
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {selectedUser.name}
                </h3>
              </div>
              <button
                onClick={() => setUserModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div className="bg-cosmic-950 p-3.5 rounded-xl border border-gold-500/20 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-ivory-200/60">Email:</span>
                  <span className="text-white font-mono">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-200/60">Phone:</span>
                  <span className="text-white font-mono">{selectedUser.phone}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                  Palmistry AI Scan Credits
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    value={userCredits}
                    onChange={(e) => setUserCredits(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white font-bold text-sm focus:border-gold-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setUserCredits((prev) => prev + 5)}
                    className="px-3 py-2.5 rounded-xl bg-cosmic-800 border border-gold-500/30 text-gold-300 font-bold whitespace-nowrap hover:bg-cosmic-700 transition"
                  >
                    +5 Bonus
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                  Account Status
                </label>
                <select
                  value={userAccountStatus}
                  onChange={(e) => setUserAccountStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white focus:border-gold-400 focus:outline-none"
                >
                  <option value="active">Active (Normal Access)</option>
                  <option value="suspended">Suspended (Blocked)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-cosmic-800 text-ivory-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl gold-btn text-cosmic-950 font-bold shadow-md cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Save User Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: ADD / EDIT CLIENT REVIEW
      ========================================================= */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-5">
              <h3 className="font-display font-bold text-lg text-white">
                {editingReview ? 'Edit Client Review' : 'Add New Client Review'}
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Sheeshpal Singh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:border-gold-400 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:border-gold-400 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                    Rating (Stars)
                  </label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white focus:border-gold-400 focus:outline-none text-xs"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                    Time / Date Text
                  </label>
                  <input
                    type="text"
                    value={reviewForm.date}
                    onChange={(e) => setReviewForm({ ...reviewForm, date: e.target.value })}
                    placeholder="e.g. 2 days ago"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:border-gold-400 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                    Avatar Initials
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={reviewForm.initials}
                    onChange={(e) => setReviewForm({ ...reviewForm, initials: e.target.value.toUpperCase() })}
                    placeholder="Auto (e.g. SS)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:border-gold-400 focus:outline-none text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1.5">
                  Client Review / Testimonial Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  placeholder="Enter the client's detailed feedback, experience, or testimonial quote..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white placeholder-cosmic-600 focus:border-gold-400 focus:outline-none text-xs font-editorial italic leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="reviewActive"
                  checked={reviewForm.active}
                  onChange={(e) => setReviewForm({ ...reviewForm, active: e.target.checked })}
                  className="w-4 h-4 rounded accent-gold-500 cursor-pointer"
                />
                <label htmlFor="reviewActive" className="text-xs text-ivory-200 cursor-pointer select-none">
                  Display and feature on BhagyaNetram Home Page
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-cosmic-800 text-ivory-200 font-semibold text-xs hover:bg-cosmic-750 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl gold-btn text-cosmic-950 font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>{editingReview ? 'Update Review' : 'Publish Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: CHANGE ADMIN PASSWORD
      ========================================================= */}
      {changePasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Change Admin Password</h3>
                  <p className="text-[11px] text-ivory-200/60">Update credentials for {adminUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setChangePasswordModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {changePasswordError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{changePasswordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-200/60 hover:text-gold-400 cursor-pointer"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-200/60 hover:text-gold-400 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setChangePasswordModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-cosmic-800 text-ivory-200 text-xs font-semibold hover:bg-cosmic-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changePasswordLoading}
                  className="px-5 py-2.5 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {changePasswordLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: MANAGE SUB-ADMINISTRATORS
      ========================================================= */}
      {subadminsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Sub-Administrator Management</h3>
                  <p className="text-xs text-ivory-200/60">
                    Add, view, and remove sub-admin accounts with role-based access.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSubadminsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs: List vs Add */}
            <div className="flex items-center justify-between mb-4 border-b border-gold-500/15 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSubadminModalTab('list')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    subadminModalTab === 'list'
                      ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow'
                      : 'bg-cosmic-950 text-gold-400 hover:bg-cosmic-800'
                  }`}
                >
                  All Administrators ({subadmins.length})
                </button>
                <button
                  onClick={() => setSubadminModalTab('add')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    subadminModalTab === 'add'
                      ? 'bg-gold-500 text-cosmic-950 shadow-gold-glow'
                      : 'bg-cosmic-950 text-gold-400 hover:bg-cosmic-800'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add New Sub-Admin</span>
                </button>
              </div>

              <button
                onClick={loadSubadmins}
                className="p-2 rounded-xl bg-cosmic-950 border border-gold-500/30 text-gold-400 hover:bg-cosmic-800 transition cursor-pointer"
                title="Refresh Roster"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* VIEW 1: Subadmins List */}
            {subadminModalTab === 'list' && (
              <div className="space-y-4">
                {subadminsLoading ? (
                  <div className="py-16 text-center text-gold-400 flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <span className="text-xs font-semibold">Loading Sub-Admins...</span>
                  </div>
                ) : (
                  <div className="bg-cosmic-950/80 border border-gold-500/25 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-gold-500/20 bg-cosmic-950 text-gold-400">
                            <th className="p-3.5 font-semibold">Administrator</th>
                            <th className="p-3.5 font-semibold">Role</th>
                            <th className="p-3.5 font-semibold">Permissions</th>
                            <th className="p-3.5 font-semibold">Status</th>
                            <th className="p-3.5 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold-500/10">
                          {subadmins.map((sub: any) => {
                            const isPrimary = sub.role === 'superadmin' || sub.email === 'admin@bhagyanetram.com';
                            return (
                              <tr key={sub._id || sub.id} className="hover:bg-cosmic-900/60">
                                <td className="p-3.5">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-300 font-bold flex items-center justify-center text-xs shrink-0 border border-gold-500/30">
                                      {sub.name ? sub.name.slice(0, 2).toUpperCase() : 'AD'}
                                    </div>
                                    <div>
                                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                        <span>{sub.name}</span>
                                        {isPrimary && (
                                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-semibold">
                                            Primary Master
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-[11px] text-ivory-200/60 block">{sub.email}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                    sub.role === 'superadmin'
                                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                  }`}>
                                    {sub.role || 'subadmin'}
                                  </span>
                                </td>
                                <td className="p-3.5">
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {Array.isArray(sub.permissions) && sub.permissions.length > 0 ? (
                                      sub.permissions.map((p: string) => (
                                        <span key={p} className="px-1.5 py-0.5 rounded bg-cosmic-900 border border-gold-500/15 text-[10px] text-ivory-200/80">
                                          {p}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-ivory-200/50 text-[10px]">All Modules</span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  <button
                                    disabled={isPrimary}
                                    onClick={() => handleToggleSubadminStatus(sub)}
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition ${
                                      sub.status === 'active'
                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                        : 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/40 hover:bg-zinc-500/30'
                                    } ${isPrimary ? 'cursor-default opacity-80' : 'cursor-pointer'}`}
                                    title={isPrimary ? 'Primary Master account cannot be toggled' : 'Click to toggle status'}
                                  >
                                    {sub.status || 'active'}
                                  </button>
                                </td>
                                <td className="p-3.5 text-right">
                                  {!isPrimary && sub.email !== (adminUser.email || '').toLowerCase() ? (
                                    <button
                                      onClick={() => handleDeleteSubadmin(sub._id || sub.id, sub.name)}
                                      className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/30 text-red-300 transition cursor-pointer border border-red-500/20"
                                      title="Remove Sub-Admin"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  ) : (
                                    <span className="text-[10px] text-ivory-200/40 italic">Protected</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: Add New Subadmin Form */}
            {subadminModalTab === 'add' && (
              <form onSubmit={handleCreateSubadmin} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gold-300 mb-1">
                      Sub-Admin Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={subadminForm.name}
                      onChange={(e) => setSubadminForm({ ...subadminForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gold-300 mb-1">
                      Email Address (Login Username) *
                    </label>
                    <input
                      type="email"
                      required
                      value={subadminForm.email}
                      onChange={(e) => setSubadminForm({ ...subadminForm, email: e.target.value })}
                      placeholder="e.g. rahul@bhagyanetram.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-gold-300">
                        Login Password *
                      </label>
                      <button
                        type="button"
                        onClick={generateRandomPassword}
                        className="text-[10px] text-gold-400 hover:underline cursor-pointer"
                      >
                        ⚡ Generate Random
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showSubadminPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={subadminForm.password}
                        onChange={(e) => setSubadminForm({ ...subadminForm, password: e.target.value })}
                        placeholder="Min 6 characters"
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSubadminPassword(!showSubadminPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-200/60 hover:text-gold-400 cursor-pointer"
                      >
                        {showSubadminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gold-300 mb-1">
                      Role & Access Level
                    </label>
                    <select
                      value={subadminForm.role}
                      onChange={(e) => setSubadminForm({ ...subadminForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-gold-500/30 text-white text-xs focus:border-gold-400 focus:outline-none"
                    >
                      <option value="subadmin">Standard Sub-Admin</option>
                      <option value="admin">Operations Admin</option>
                    </select>
                  </div>
                </div>

                {/* Permissions checkboxes */}
                <div className="bg-cosmic-950/70 border border-gold-500/20 rounded-2xl p-4">
                  <label className="block text-xs font-bold text-gold-300 mb-2">
                    Module Access Permissions
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-ivory-200">
                    {[
                      { key: 'astrologers', label: '🔮 Astrologers Directory' },
                      { key: 'blogs', label: '✍️ Blogs & Wisdom' },
                      { key: 'queries', label: '📩 Customer Queries' },
                      { key: 'users', label: '👥 User Accounts' },
                      { key: 'reviews', label: '⭐ Client Reviews' },
                    ].map((m) => {
                      const isChecked = subadminForm.permissions.includes(m.key);
                      return (
                        <label
                          key={m.key}
                          className="flex items-center gap-2 p-2 rounded-xl bg-cosmic-900 border border-gold-500/15 hover:border-gold-500/40 cursor-pointer transition select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSubadminForm({
                                  ...subadminForm,
                                  permissions: [...subadminForm.permissions, m.key],
                                });
                              } else {
                                setSubadminForm({
                                  ...subadminForm,
                                  permissions: subadminForm.permissions.filter((p) => p !== m.key),
                                });
                              }
                            }}
                            className="accent-gold-500 w-4 h-4 rounded cursor-pointer"
                          />
                          <span className="text-[11px] font-medium">{m.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSubadminModalTab('list')}
                    className="px-4 py-2.5 rounded-xl bg-cosmic-800 text-ivory-200 text-xs font-semibold hover:bg-cosmic-700 transition cursor-pointer"
                  >
                    Back to List
                  </button>
                  <button
                    type="submit"
                    disabled={subadminActionLoading}
                    className="px-5 py-2.5 rounded-xl gold-btn text-cosmic-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {subadminActionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Create Sub-Admin Account</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: INSPECT ACTIVITY LOG DETAIL
      ========================================================= */}
      {selectedLogDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-cosmic-900 border border-gold-500/40 rounded-3xl p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-5">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-gold-400" />
                <h3 className="font-display font-bold text-lg text-white">
                  Activity Audit Event Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedLogDetail(null)}
                className="p-1.5 rounded-full hover:bg-cosmic-800 text-ivory-200/70 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-cosmic-950 border border-gold-500/20 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-ivory-200/60 font-medium">Action Code:</span>
                  <span className="font-bold text-gold-300 font-mono">{selectedLogDetail.action}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ivory-200/60 font-medium">Category Module:</span>
                  <span className="uppercase text-gold-400 font-bold">{selectedLogDetail.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ivory-200/60 font-medium">Performed By:</span>
                  <span className="text-white font-semibold">
                    {selectedLogDetail.adminName} ({selectedLogDetail.adminEmail})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ivory-200/60 font-medium">Admin Role:</span>
                  <span className="uppercase text-amber-300 font-semibold">{selectedLogDetail.adminRole}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ivory-200/60 font-medium">Timestamp (IST):</span>
                  <span className="text-ivory-100 font-mono">
                    {new Date(selectedLogDetail.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ivory-200/60 font-medium">Client IP / Device:</span>
                  <span className="text-ivory-100 font-mono">{selectedLogDetail.ip || '127.0.0.1'}</span>
                </div>
              </div>

              <div>
                <label className="block text-gold-400 font-semibold mb-1">Description:</label>
                <p className="p-3 rounded-xl bg-cosmic-950 border border-gold-500/20 text-ivory-100 leading-relaxed">
                  {selectedLogDetail.description}
                </p>
              </div>

              {selectedLogDetail.targetTitle && (
                <div>
                  <label className="block text-gold-400 font-semibold mb-1">Target Resource:</label>
                  <p className="p-2.5 rounded-xl bg-cosmic-950 border border-gold-500/20 text-gold-300 font-medium">
                    {selectedLogDetail.targetTitle} {selectedLogDetail.targetId ? `(ID: ${selectedLogDetail.targetId})` : ''}
                  </p>
                </div>
              )}

              {selectedLogDetail.details && (
                <div>
                  <label className="block text-gold-400 font-semibold mb-1">Extended JSON Metadata:</label>
                  <pre className="p-3 rounded-xl bg-cosmic-950 border border-gold-500/20 text-emerald-300 font-mono text-[11px] overflow-x-auto max-h-40">
                    {JSON.stringify(selectedLogDetail.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLogDetail(null)}
                className="px-5 py-2 rounded-xl gold-btn text-cosmic-950 font-bold text-xs cursor-pointer shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
