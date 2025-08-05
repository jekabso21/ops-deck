'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Users, 
  Settings, 
  Shield, 
  Code, 
  HelpCircle,
  Star,
  Clock,
  Edit,
  Plus,
  Filter,
  ChevronRight,
  Home,
  Building,
  Laptop,
  Coffee,
  AlertTriangle,
  CheckCircle,
  Eye,
  ThumbsUp
} from 'lucide-react';

interface WikiArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  author: string;
  lastUpdated: string;
  views: number;
  likes: number;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
}

const mockArticles: WikiArticle[] = [
  {
    id: '1',
    title: 'Getting Started with OpsDeck',
    category: 'Getting Started',
    description: 'Complete guide to using OpsDeck for new employees',
    content: 'Welcome to OpsDeck! This guide will help you get started...',
    author: 'HR Team',
    lastUpdated: '2024-01-15',
    views: 245,
    likes: 18,
    tags: ['onboarding', 'basics', 'new-employee'],
    status: 'published',
    featured: true
  },
  {
    id: '2',
    title: 'How to Submit Leave Requests',
    category: 'HR Policies',
    description: 'Step-by-step guide for requesting time off',
    content: 'To submit a leave request, follow these steps...',
    author: 'Sarah Wilson',
    lastUpdated: '2024-01-12',
    views: 189,
    likes: 24,
    tags: ['leave', 'hr', 'time-off'],
    status: 'published',
    featured: true
  },
  {
    id: '3',
    title: 'IT Equipment Request Process',
    category: 'IT Support',
    description: 'How to request new hardware or software',
    content: 'When you need new equipment or software...',
    author: 'IT Department',
    lastUpdated: '2024-01-10',
    views: 156,
    likes: 12,
    tags: ['equipment', 'hardware', 'software', 'it'],
    status: 'published',
    featured: false
  },
  {
    id: '4',
    title: 'Security Best Practices',
    category: 'Security',
    description: 'Essential security guidelines for all employees',
    content: 'Security is everyone\'s responsibility...',
    author: 'Security Team',
    lastUpdated: '2024-01-08',
    views: 298,
    likes: 35,
    tags: ['security', 'passwords', 'best-practices'],
    status: 'published',
    featured: true
  },
  {
    id: '5',
    title: 'Remote Work Guidelines',
    category: 'Policies',
    description: 'Policies and best practices for remote work',
    content: 'Our remote work policy ensures...',
    author: 'Management',
    lastUpdated: '2024-01-05',
    views: 167,
    likes: 21,
    tags: ['remote', 'work-from-home', 'policy'],
    status: 'published',
    featured: false
  },
  {
    id: '6',
    title: 'API Documentation',
    category: 'Development',
    description: 'Complete API reference for developers',
    content: 'Our internal API provides endpoints for...',
    author: 'Dev Team',
    lastUpdated: '2024-01-03',
    views: 89,
    likes: 8,
    tags: ['api', 'development', 'technical'],
    status: 'published',
    featured: false
  },
  {
    id: '7',
    title: 'Office Layout and Facilities',
    category: 'Office Info',
    description: 'Guide to office spaces, meeting rooms, and facilities',
    content: 'Our office is designed to promote collaboration...',
    author: 'Facilities Team',
    lastUpdated: '2024-01-01',
    views: 134,
    likes: 15,
    tags: ['office', 'facilities', 'meeting-rooms'],
    status: 'published',
    featured: false
  },
  {
    id: '8',
    title: 'Emergency Procedures',
    category: 'Safety',
    description: 'What to do in case of emergencies',
    content: 'In case of emergency, follow these procedures...',
    author: 'Safety Committee',
    lastUpdated: '2023-12-28',
    views: 201,
    likes: 28,
    tags: ['emergency', 'safety', 'procedures'],
    status: 'published',
    featured: true
  }
];

const categories = [
  { name: 'Getting Started', icon: Home, count: 3, color: 'text-green-400' },
  { name: 'HR Policies', icon: Users, count: 5, color: 'text-blue-400' },
  { name: 'IT Support', icon: Laptop, count: 8, color: 'text-purple-400' },
  { name: 'Security', icon: Shield, count: 4, color: 'text-red-400' },
  { name: 'Development', icon: Code, count: 6, color: 'text-yellow-400' },
  { name: 'Policies', icon: FileText, count: 7, color: 'text-indigo-400' },
  { name: 'Office Info', icon: Building, count: 3, color: 'text-pink-400' },
  { name: 'Safety', icon: AlertTriangle, count: 2, color: 'text-orange-400' }
];

export default function WikiView() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(null);
  const [viewMode, setViewMode] = useState<'browse' | 'article'>('browse');

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory && article.status === 'published';
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const recentArticles = [...filteredArticles]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  const handleArticleClick = (article: WikiArticle) => {
    setSelectedArticle(article);
    setViewMode('article');
  };

  const handleBackToBrowse = () => {
    setSelectedArticle(null);
    setViewMode('browse');
  };

  if (viewMode === 'article' && selectedArticle) {
    return (
      <div className="space-y-6">
        {/* Article Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToBrowse}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>Back to Wiki</span>
          </button>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-3 py-2 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button className="inline-flex items-center px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              <ThumbsUp className="h-4 w-4 mr-2" />
              {selectedArticle.likes}
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-8">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span>{selectedArticle.category}</span>
              <span>•</span>
              <span>By {selectedArticle.author}</span>
              <span>•</span>
              <span>Updated {selectedArticle.lastUpdated}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{selectedArticle.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{selectedArticle.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{selectedArticle.views} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{selectedArticle.likes} likes</span>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-foreground leading-relaxed">
              {selectedArticle.content}
              
              {/* Sample content */}
              <div className="mt-8 space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Overview</h2>
                <p>This comprehensive guide covers everything you need to know about this topic. We'll walk through the key concepts, best practices, and common scenarios you might encounter.</p>
                
                <h2 className="text-xl font-semibold text-foreground">Step-by-Step Instructions</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>First, navigate to the appropriate section in OpsDeck</li>
                  <li>Click on the relevant action button</li>
                  <li>Fill out the required information</li>
                  <li>Review your submission before confirming</li>
                  <li>Submit and wait for confirmation</li>
                </ol>

                <h2 className="text-xl font-semibold text-foreground">Important Notes</h2>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 font-medium">Important</p>
                      <p className="text-muted-foreground">Make sure to follow all company policies when completing this process.</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-foreground">Need Help?</h2>
                <p>If you have questions or need assistance, don't hesitate to reach out to the appropriate team or check our other documentation.</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <div className="flex flex-wrap gap-2">
              {selectedArticle.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Company Wiki</h1>
          <p className="text-sm text-muted-foreground">
            Knowledge base, documentation, and guides for all company processes
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles, guides, and documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card/50 border border-border/50 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-card/50 border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.name} value={category.name}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredArticles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <h3 className="font-medium text-foreground mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.category}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{article.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              All Articles ({filteredArticles.length})
            </h2>
            <div className="space-y-4">
              {filteredArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{article.category}</span>
                        <span>By {article.author}</span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground ml-4">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{article.likes}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        +{article.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted/30 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-4 w-4 ${category.color}`} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-xs bg-muted/50 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Articles */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recently Updated
            </h3>
            <div className="space-y-3">
              {recentArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <h4 className="text-sm font-medium text-foreground mb-1">{article.title}</h4>
                  <p className="text-xs text-muted-foreground">{article.category} • {article.lastUpdated}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {user?.role === 'admin' && (
                <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
                  <Plus className="h-4 w-4 text-primary" />
                  <span className="text-sm">Create New Article</span>
                </button>
              )}
              <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
                <HelpCircle className="h-4 w-4 text-primary" />
                <span className="text-sm">Request Documentation</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">View My Drafts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}