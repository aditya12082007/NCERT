import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { User, Album, MediaItem, LoginHistoryItem, ActivityLogItem, DashboardStats } from '../src/types/index.js';

const DB_DIR = path.resolve(process.cwd(), 'database');
const DB_FILE = path.join(DB_DIR, 'data.json');
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

interface Schema {
  users: (User & { passwordHash: string })[];
  albums: Album[];
  media: MediaItem[];
  loginHistory: LoginHistoryItem[];
  activityLogs: ActivityLogItem[];
}

function ensureDirectoriesExist() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  const photoDir = path.join(UPLOADS_DIR, 'photos');
  const videoDir = path.join(UPLOADS_DIR, 'videos');
  const thumbDir = path.join(UPLOADS_DIR, 'thumbnails');
  if (!fs.existsSync(photoDir)) fs.mkdirSync(photoDir, { recursive: true });
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });
}

function getInitialData(): Schema {
  const defaultPasswordHash = bcrypt.hashSync('Akritya@1205', 10);
  const now = new Date().toISOString();

  const users = [
    {
      id: 'u-1',
      username: 'Aditya',
      passwordHash: defaultPasswordHash,
      role: 'admin' as const,
      displayName: 'Aditya',
      createdAt: now,
    },
    {
      id: 'u-2',
      username: 'Akriti',
      passwordHash: defaultPasswordHash,
      role: 'admin' as const,
      displayName: 'Akriti',
      createdAt: now,
    }
  ];

  const albums: Album[] = [
    {
      id: 'alb-1',
      name: 'Curated Moments & Travel',
      description: 'Personal memory archive from summer trips and celebrations',
      createdBy: 'Aditya',
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      updatedAt: now,
      coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    },
    {
      id: 'alb-2',
      name: 'Private Video Vault',
      description: 'High definition personal video recordings and memory clips',
      createdBy: 'Akriti',
      createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
      updatedAt: now,
      coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&q=80',
    },
    {
      id: 'alb-3',
      name: 'Aesthetic Scenery & Photography',
      description: 'Nature shots, architecture, and artistic framing',
      createdBy: 'Aditya',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      updatedAt: now,
      coverUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    }
  ];

  const media: MediaItem[] = [
    {
      id: 'm-1',
      albumId: 'alb-1',
      title: 'Serene Alpine Lake Sunset',
      fileName: 'alpine_sunset.jpg',
      filePath: 'photos/alpine_sunset.jpg',
      fileType: 'photo',
      fileSize: 2450000,
      mimeType: 'image/jpeg',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      uploadedBy: 'Aditya',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      tags: ['nature', 'lake', 'sunset']
    },
    {
      id: 'm-2',
      albumId: 'alb-1',
      title: 'Mist Mountain Peak Sunrise',
      fileName: 'mountain_mist.jpg',
      filePath: 'photos/mountain_mist.jpg',
      fileType: 'photo',
      fileSize: 3120000,
      mimeType: 'image/jpeg',
      thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      uploadedBy: 'Aditya',
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      tags: ['mountains', 'sunrise']
    },
    {
      id: 'm-3',
      albumId: 'alb-3',
      title: 'Emerald Forest Walkway',
      fileName: 'forest_walkway.jpg',
      filePath: 'photos/forest_walkway.jpg',
      fileType: 'photo',
      fileSize: 1890000,
      mimeType: 'image/jpeg',
      thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      uploadedBy: 'Akriti',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      tags: ['forest', 'trees', 'green']
    },
    {
      id: 'm-4',
      albumId: 'alb-2',
      title: 'Ocean Waves Timelapse Highlight',
      fileName: 'ocean_waves.mp4',
      filePath: 'videos/ocean_waves.mp4',
      fileType: 'video',
      fileSize: 12400000,
      mimeType: 'video/mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&q=80',
      uploadedBy: 'Akriti',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      duration: 28,
      tags: ['ocean', 'waves', 'relaxing']
    },
    {
      id: 'm-5',
      albumId: 'alb-3',
      title: 'Golden Hour Architectural Silhouette',
      fileName: 'golden_arch.jpg',
      filePath: 'photos/golden_arch.jpg',
      fileType: 'photo',
      fileSize: 2890000,
      mimeType: 'image/jpeg',
      thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
      uploadedBy: 'Aditya',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      tags: ['architecture', 'golden hour']
    },
    {
      id: 'm-6',
      albumId: 'alb-2',
      title: 'Night City Lights Drone Flight',
      fileName: 'city_drone.mp4',
      filePath: 'videos/city_drone.mp4',
      fileType: 'video',
      fileSize: 18500000,
      mimeType: 'video/mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
      uploadedBy: 'Aditya',
      createdAt: now,
      duration: 42,
      tags: ['city', 'lights', 'drone']
    }
  ];

  const loginHistory: LoginHistoryItem[] = [
    {
      id: 'lh-1',
      username: 'Aditya',
      status: 'success',
      ipAddress: '127.0.0.1',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'lh-2',
      username: 'Akriti',
      status: 'success',
      ipAddress: '127.0.0.1',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)',
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    }
  ];

  const activityLogs: ActivityLogItem[] = [
    {
      id: 'act-1',
      userId: 'u-1',
      username: 'Aditya',
      action: 'SYSTEM_INIT',
      details: 'Vault initialized with secure BCrypt encryption',
      timestamp: now,
    }
  ];

  return { users, albums, media, loginHistory, activityLogs };
}

class Database {
  private data: Schema;

  constructor() {
    ensureDirectoriesExist();
    if (!fs.existsSync(DB_FILE)) {
      this.data = getInitialData();
      this.save();
    } else {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure default users always exist and have updated passwords if needed
        this.ensureDefaultUsers();
      } catch (err) {
        console.error('Failed to parse database file, resetting to initial:', err);
        this.data = getInitialData();
        this.save();
      }
    }
  }

  private ensureDefaultUsers() {
    const defaultPasswordHash = bcrypt.hashSync('Akritya@1205', 10);
    const existingAditya = this.data.users.find(u => u.username === 'Aditya');
    if (!existingAditya) {
      this.data.users.push({
        id: 'u-1',
        username: 'Aditya',
        passwordHash: defaultPasswordHash,
        role: 'admin',
        displayName: 'Aditya',
        createdAt: new Date().toISOString(),
      });
    } else {
      // Force sync bcrypt hash for security
      existingAditya.passwordHash = defaultPasswordHash;
    }

    const existingAkriti = this.data.users.find(u => u.username === 'Akriti');
    if (!existingAkriti) {
      this.data.users.push({
        id: 'u-2',
        username: 'Akriti',
        passwordHash: defaultPasswordHash,
        role: 'admin',
        displayName: 'Akriti',
        createdAt: new Date().toISOString(),
      });
    } else {
      existingAkriti.passwordHash = defaultPasswordHash;
    }
    this.save();
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DB:', err);
    }
  }

  // User Operations
  public findUserByUsername(username: string) {
    return this.data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  public getUserById(id: string) {
    const user = this.data.users.find(u => u.id === id);
    if (!user) return null;
    const { passwordHash, ...rest } = user;
    return rest as User;
  }

  public updateLastLogin(userId: string) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      user.lastLogin = new Date().toISOString();
      this.save();
    }
  }

  // Albums
  public getAlbums(): Album[] {
    return this.data.albums.map(a => {
      const count = this.data.media.filter(m => m.albumId === a.id).length;
      return { ...a, mediaCount: count };
    });
  }

  public getAlbumById(id: string): Album | undefined {
    const album = this.data.albums.find(a => a.id === id);
    if (!album) return undefined;
    const count = this.data.media.filter(m => m.albumId === id).length;
    return { ...album, mediaCount: count };
  }

  public createAlbum(name: string, description: string, createdBy: string, coverUrl?: string): Album {
    const newAlbum: Album = {
      id: `alb-${Date.now()}`,
      name,
      description,
      createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      coverUrl,
      mediaCount: 0,
    };
    this.data.albums.push(newAlbum);
    this.save();

    this.logActivity(createdBy, createdBy, 'CREATE_ALBUM', `Created album "${name}"`);
    return newAlbum;
  }

  public renameAlbum(id: string, newName: string, updatedBy: string): Album | null {
    const album = this.data.albums.find(a => a.id === id);
    if (!album) return null;
    const oldName = album.name;
    album.name = newName;
    album.updatedAt = new Date().toISOString();
    this.save();

    this.logActivity(updatedBy, updatedBy, 'RENAME_ALBUM', `Renamed album from "${oldName}" to "${newName}"`);
    return album;
  }

  public deleteAlbum(id: string, deletedBy: string): boolean {
    const idx = this.data.albums.findIndex(a => a.id === id);
    if (idx === -1) return false;
    const albumName = this.data.albums[idx].name;
    this.data.albums.splice(idx, 1);
    
    // Also clean media belonging to this album
    this.data.media = this.data.media.filter(m => m.albumId !== id);
    this.save();

    this.logActivity(deletedBy, deletedBy, 'DELETE_ALBUM', `Deleted album "${albumName}" and its media`);
    return true;
  }

  // Media
  public getMedia(albumId?: string, search?: string, fileType?: 'photo' | 'video'): MediaItem[] {
    let result = [...this.data.media];

    if (albumId && albumId !== 'all') {
      result = result.filter(m => m.albumId === albumId);
    }

    if (fileType) {
      result = result.filter(m => m.fileType === fileType);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        m => m.title.toLowerCase().includes(q) ||
          m.fileName.toLowerCase().includes(q) ||
          (m.tags && m.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getMediaById(id: string): MediaItem | undefined {
    return this.data.media.find(m => m.id === id);
  }

  public addMedia(item: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem {
    const newItem: MediaItem = {
      ...item,
      id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.media.unshift(newItem);

    // Update album updated_at and coverUrl if missing
    const album = this.data.albums.find(a => a.id === item.albumId);
    if (album) {
      album.updatedAt = new Date().toISOString();
      if (!album.coverUrl && newItem.thumbnailUrl) {
        album.coverUrl = newItem.thumbnailUrl;
      }
    }

    this.save();
    this.logActivity(item.uploadedBy, item.uploadedBy, 'UPLOAD_MEDIA', `Uploaded ${item.fileType} "${item.title}"`);
    return newItem;
  }

  public deleteMedia(id: string, deletedBy: string): boolean {
    const idx = this.data.media.findIndex(m => m.id === id);
    if (idx === -1) return false;
    const media = this.data.media[idx];
    this.data.media.splice(idx, 1);
    this.save();

    this.logActivity(deletedBy, deletedBy, 'DELETE_MEDIA', `Deleted ${media.fileType} "${media.title}"`);
    return true;
  }

  // Login History & Activity Logs
  public recordLogin(username: string, status: 'success' | 'failure', ipAddress: string, userAgent: string) {
    const item: LoginHistoryItem = {
      id: `lh-${Date.now()}`,
      username,
      status,
      ipAddress,
      userAgent,
      timestamp: new Date().toISOString(),
    };
    this.data.loginHistory.unshift(item);
    if (this.data.loginHistory.length > 200) {
      this.data.loginHistory = this.data.loginHistory.slice(0, 200);
    }
    this.save();
  }

  public getLoginHistory(): LoginHistoryItem[] {
    return this.data.loginHistory;
  }

  public logActivity(userId: string, username: string, action: string, details: string) {
    const item: ActivityLogItem = {
      id: `act-${Date.now()}`,
      userId,
      username,
      action,
      details,
      timestamp: new Date().toISOString(),
    };
    this.data.activityLogs.unshift(item);
    if (this.data.activityLogs.length > 200) {
      this.data.activityLogs = this.data.activityLogs.slice(0, 200);
    }
    this.save();
  }

  public getActivityLogs(): ActivityLogItem[] {
    return this.data.activityLogs;
  }

  // Dashboard Stats
  public getDashboardStats(): DashboardStats {
    const photos = this.data.media.filter(m => m.fileType === 'photo');
    const videos = this.data.media.filter(m => m.fileType === 'video');
    const totalBytes = this.data.media.reduce((acc, curr) => acc + (curr.fileSize || 0), 0);

    return {
      totalPhotos: photos.length,
      totalVideos: videos.length,
      totalAlbums: this.data.albums.length,
      totalStorageBytes: totalBytes,
      totalUsers: this.data.users.length,
      totalLogins: this.data.loginHistory.length,
      recentActivity: this.data.activityLogs.slice(0, 10),
    };
  }
}

export const db = new Database();
