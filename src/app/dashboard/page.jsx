"use client";
import { Trash, Plus, Save, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
    content: ""
  });
  const [errors, setErrors] = useState({});

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    `api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

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
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          author: session?.data?.user?.name
        }),
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
        setErrors({});
        // Refresh the data
        mutate();
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setErrors({ submit: 'Failed to create post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          mutate(); // Refresh the data
        } else {
          throw new Error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
    <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your blog posts</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No posts yet. Create your first post!</p>
      </div>
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground">Create New Post</h2>
                  <button
                    onClick={resetForm}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
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
                      rows={6}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none ${
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

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isSubmitting ? 'Creating...' : 'Create Post'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
