import AdminLog from '../models/AdminLog.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bhagyanetram.com';

/**
 * Record an audit log entry for administrative activity.
 */
export const logAdminActivity = async ({
  req,
  admin,
  action,
  category = 'system',
  description,
  targetId = '',
  targetTitle = '',
  details = null,
}) => {
  try {
    const adminUser = admin || req?.user || {};

    let adminEmail = (adminUser.email || '').trim().toLowerCase();
    let adminRole = adminUser.role || 'subadmin';

    // If master superadmin
    if (adminEmail === ADMIN_EMAIL.toLowerCase()) {
      adminRole = 'superadmin';
    }

    let adminName = adminUser.name;
    if (!adminName) {
      if (adminEmail === ADMIN_EMAIL.toLowerCase()) {
        adminName = 'BhagyaNetram Administrator';
      } else if (adminEmail) {
        adminName = adminEmail.split('@')[0];
      } else {
        adminName = 'System';
      }
    }

    let ip = '';
    if (req) {
      const forwarded = req.headers['x-forwarded-for'];
      ip = (forwarded ? forwarded.split(',')[0] : req.socket?.remoteAddress) || '';
      ip = ip.replace('::ffff:', '').trim();
    }

    const logEntry = new AdminLog({
      adminId: adminUser.userId || adminUser.id || adminUser._id || null,
      adminName,
      adminEmail: adminEmail || ADMIN_EMAIL.toLowerCase(),
      adminRole,
      action: String(action).toUpperCase(),
      category: category.toLowerCase(),
      description,
      targetId: String(targetId || ''),
      targetTitle: String(targetTitle || ''),
      details,
      ip,
      createdAt: new Date(),
    });

    await logEntry.save();
  } catch (error) {
    console.warn('[logAdminActivity] Error logging admin action:', error.message);
  }
};

/**
 * Seed initial historical logs if the collection is fresh,
 * giving administrators an immediate, structured audit trail.
 */
export const seedInitialLogsIfEmpty = async () => {
  try {
    const count = await AdminLog.countDocuments({});
    if (count === 0) {
      console.log('No activity logs found. Auto-seeding initial audit trail history...');
      const now = Date.now();
      const initialLogs = [
        {
          adminName: 'BhagyaNetram Administrator',
          adminEmail: ADMIN_EMAIL.toLowerCase(),
          adminRole: 'superadmin',
          action: 'SYSTEM_INIT',
          category: 'system',
          description: 'BhagyaNetram Administrative Control & Security System initialized.',
          targetTitle: 'System Core',
          ip: '127.0.0.1',
          createdAt: new Date(now - 7 * 24 * 3600 * 1000),
        },
        {
          adminName: 'BhagyaNetram Administrator',
          adminEmail: ADMIN_EMAIL.toLowerCase(),
          adminRole: 'superadmin',
          action: 'CREATE_ASTROLOGER',
          category: 'astrologers',
          description: 'Configured verified profile for "Pandit Pranav" (Vedic Astrology & Vastu).',
          targetTitle: 'Pandit Pranav',
          ip: '127.0.0.1',
          createdAt: new Date(now - 5 * 24 * 3600 * 1000),
        },
        {
          adminName: 'BhagyaNetram Administrator',
          adminEmail: ADMIN_EMAIL.toLowerCase(),
          adminRole: 'superadmin',
          action: 'CREATE_ASTROLOGER',
          category: 'astrologers',
          description: 'Configured verified profile for "Gargi Ji" (Palmistry, Astro, Vastu).',
          targetTitle: 'Gargi Ji',
          ip: '127.0.0.1',
          createdAt: new Date(now - 5 * 24 * 3600 * 1000),
        },
        {
          adminName: 'BhagyaNetram Administrator',
          adminEmail: ADMIN_EMAIL.toLowerCase(),
          adminRole: 'superadmin',
          action: 'CREATE_ASTROLOGER',
          category: 'astrologers',
          description: 'Configured verified profile for "Nidhi Ji" (Vedic Astrology, Vastu).',
          targetTitle: 'Nidhi Ji',
          ip: '127.0.0.1',
          createdAt: new Date(now - 4 * 24 * 3600 * 1000),
        },
        {
          adminName: 'BhagyaNetram Administrator',
          adminEmail: ADMIN_EMAIL.toLowerCase(),
          adminRole: 'superadmin',
          action: 'CREATE_BLOG',
          category: 'blogs',
          description: 'Published Vedic article: "Vastu for the Main Entrance: Attracting Positive Energy with Stones and Shells".',
          targetTitle: 'Vastu for the Main Entrance',
          ip: '127.0.0.1',
          createdAt: new Date(now - 3 * 24 * 3600 * 1000),
        },
        {
          adminName: 'BhagyaNetram Administrator',
          adminEmail: ADMIN_EMAIL.toLowerCase(),
          adminRole: 'superadmin',
          action: 'SUBADMIN_ROSTER_INIT',
          category: 'subadmins',
          description: 'Sub-admin access control roster configured with granular module permissions.',
          targetTitle: 'Security Roster',
          ip: '127.0.0.1',
          createdAt: new Date(now - 2 * 24 * 3600 * 1000),
        },
        {
          adminName: 'BhagyaNetram Administrator',
          adminEmail: ADMIN_EMAIL.toLowerCase(),
          adminRole: 'superadmin',
          action: 'LOGIN',
          category: 'security',
          description: 'Master Superadmin logged in to Admin Command Center.',
          targetTitle: 'Admin Session',
          ip: '127.0.0.1',
          createdAt: new Date(now - 1 * 3600 * 1000),
        },
      ];

      await AdminLog.insertMany(initialLogs);
      console.log('Initial activity audit trail seeded successfully.');
    }
  } catch (err) {
    console.warn('seedInitialLogsIfEmpty error:', err.message);
  }
};
