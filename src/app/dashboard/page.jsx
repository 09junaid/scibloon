"use client";
import { Trash, Plus, Save, X, Edit, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Head from "next/head";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
    content: ""
  });
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    `api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  // Toast functions
  const addToast = (type, message, duration = 4000) => {
    const id = Date.now() + Math.random();
    const toast = { id, type, message, duration };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }
    if (!formData.img.trim()) {
      newErrors.img = "Image URL is required";
    } else if (!isValidUrl(formData.img)) {
      newErrors.img = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const isEdit = editingPost !== null;
      const url = isEdit ? '/api/posts' : '/api/posts';
      const method = isEdit ? 'PUT' : 'POST';
      
      const requestBody = {
        ...formData,
        author: session?.data?.user?.name
      };
      
      if (isEdit) {
        requestBody._id = editingPost._id;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Reset form
        setFormData({
          title: "",
          description: "",
          img: "",
          content: ""
        });
        setShowForm(false);
        setEditingPost(null);
        setErrors({});
        // Refresh the data
        mutate();
        // Show success toast
        addToast('success', isEdit ? 'Post updated successfully!' : 'Post created successfully!');
      } else {
        throw new Error(`Failed to ${isEdit ? 'update' : 'create'} post`);
      }
    } catch (error) {
      console.error(`Error ${editingPost ? 'updating' : 'creating'} post:`, error);
      setErrors({ submit: `Failed to ${editingPost ? 'update' : 'create'} post. Please try again.` });
      addToast('error', `Failed to ${editingPost ? 'update' : 'create'} post. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    try {
      const response = await fetch(`/api/posts/${postToDelete._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        mutate(); // Refresh the data
        setShowDeleteModal(false);
        setPostToDelete(null);
        addToast('success', 'Post deleted successfully!');
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      addToast('error', 'Failed to delete post. Please try again.');
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      img: post.img,
      content: post.content
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      img: "",
      content: ""
    });
    setErrors({});
    setShowForm(false);
    setEditingPost(null);
  };

  if (session.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard | Scribloon - Manage Your Blog Posts</title>
        <meta name="description" content="Manage and create your blog posts on Scribloon. Edit, delete, and organize your content with our intuitive dashboard interface." />
        <meta name="keywords" content="dashboard, blog management, content creation, blog posts, Scribloon, CMS" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Dashboard | Scribloon" />
        <meta property="og:description" content="Manage and create your blog posts on Scribloon dashboard." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dashboard | Scribloon" />
        <meta name="twitter:description" content="Manage and create your blog posts on Scribloon dashboard." />
        <link rel="canonical" href="/dashboard" />
        <style jsx>{`
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideOutToRight {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
          
          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
          
          .toast-enter {
            animation: slideInFromRight 0.3s ease-out;
          }
          
          .toast-exit {
            animation: slideOutToRight 0.3s ease-in;
          }
        `}</style>
      </Head>

      <div className="container min-h-screen bg-background p-4 sm:p-6">
        <div className="max-w-6xl mx-auto lg:px-2">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">Manage your blog posts</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center cursor-pointer gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
            aria-label="Create new blog post"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">New Post</span>
            <span className="xs:hidden">New</span>
          </button>
        </header>

        {/* Posts Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : data?.length > 0 ? (
            data.map((item) => (
              <div key={item._id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <Image 
                    src={item.img} 
                    alt={item.title}
                    width={400}
                    height={200}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-primary cursor-pointer text-primary-foreground p-1.5 sm:p-2 rounded-full hover:bg-primary/90 transition-colors"
                      title="Edit post"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
                      className="bg-destructive cursor-pointer text-destructive-foreground p-1.5 sm:p-2 rounded-full hover:bg-destructive/90 transition-colors"
                      title="Delete post"
                    >
                      <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No posts yet. Create your first post!</p>
            </div>
          )}
        </main>

        {/* Form Modal */}
        {showForm && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-card-foreground">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-1"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" role="form" aria-label="Blog post form">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-card-foreground mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.title ? 'border-destructive' : 'border-input'
                      }`}
                      placeholder="Enter post title"
                    />
                    {errors.title && (
                      <p className="text-destructive text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

    <div>
                    <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-2">
                      Description *
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.description ? 'border-destructive' : 'border-input'
                      }`}
                      placeholder="Enter post description"
                    />
                    {errors.description && (
                      <p className="text-destructive text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

      <div>
                    <label htmlFor="img" className="block text-sm font-medium text-card-foreground mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      id="img"
                      name="img"
                      value={formData.img}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                        errors.img ? 'border-destructive' : 'border-input'
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors.img && (
                      <p className="text-destructive text-sm mt-1">{errors.img}</p>
                    )}
                  </div>

      <div>
                    <label htmlFor="content" className="block text-sm font-medium text-card-foreground mb-2">
                      Content *
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none ${
                        errors.content ? 'border-destructive' : 'border-input'
                      }`}
                      placeholder="Write your post content here..."
                    />
                    {errors.content && (
                      <p className="text-destructive text-sm mt-1">{errors.content}</p>
                    )}
                  </div>

                  {errors.submit && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                      <p className="text-destructive text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center cursor-pointer gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base justify-center"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isSubmitting ? (editingPost ? 'Updating...' : 'Creating...') : (editingPost ? 'Update Post' : 'Create Post')}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border cursor-pointer border-border rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && postToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-card border border-border rounded-lg w-full max-w-md mx-2 sm:mx-0">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-destructive/10 p-2 rounded-full">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-card-foreground">Delete Post</h2>
                </div>
                
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Are you sure you want to delete "<span className="font-semibold text-card-foreground">{postToDelete.title}</span>"? 
                  This action cannot be undone.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 bg-destructive cursor-pointer text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90 transition-colors text-sm sm:text-base"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setPostToDelete(null);
                    }}
                    className="flex-1 px-4 py-2 cursor-pointer border border-border rounded-lg hover:bg-muted transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
      </div>
        )}
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Scribloon Dashboard",
            "description": "Manage and create your blog posts on Scribloon",
            "url": "/dashboard",
            "applicationCategory": "ContentManagementSystem",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Scribloon"
            }
          })
        }}
      />

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[60] space-y-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm
              transform transition-all duration-300 ease-in-out
              toast-enter
              ${toast.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
              }
            `}
          >
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {toast.type === 'error' && (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-100 ease-linear ${
                    toast.type === 'success' 
                      ? 'bg-green-500' 
                      : toast.type === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                  style={{
                    width: '100%',
                    animation: `shrink ${toast.duration}ms linear forwards`
                  }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
