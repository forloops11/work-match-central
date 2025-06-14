
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Trash2, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavedSearch {
  id: string;
  name: string;
  keyword: string;
  location: string;
  role: string;
  salary: string;
  notifications: boolean;
  createdAt: Date;
}

interface SavedSearchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySearch: (search: SavedSearch) => void;
}

export default function SavedSearchesModal({ isOpen, onClose, onApplySearch }: SavedSearchesModalProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [searchName, setSearchName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load saved searches from localStorage
    const saved = localStorage.getItem('savedSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
  }, [isOpen]);

  const saveCurrentSearch = () => {
    if (!searchName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your search.",
        variant: "destructive",
      });
      return;
    }

    // Get current search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: searchName.trim(),
      keyword: urlParams.get('keyword') || '',
      location: urlParams.get('location') || '',
      role: urlParams.get('role') || '',
      salary: urlParams.get('salary') || '',
      notifications: false,
      createdAt: new Date()
    };

    const updatedSearches = [...savedSearches, newSearch];
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
    setSearchName('');

    toast({
      title: "Search Saved",
      description: "Your search has been saved successfully.",
    });
  };

  const deleteSearch = (id: string) => {
    const updatedSearches = savedSearches.filter(search => search.id !== id);
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));

    toast({
      title: "Search Deleted",
      description: "Your saved search has been removed.",
    });
  };

  const toggleNotifications = (id: string) => {
    const updatedSearches = savedSearches.map(search =>
      search.id === id ? { ...search, notifications: !search.notifications } : search
    );
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  const applySearch = (search: SavedSearch) => {
    onApplySearch(search);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Saved Searches
          </DialogTitle>
        </DialogHeader>

        {/* Save Current Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Save Current Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter a name for this search..."
              />
              <Button onClick={saveCurrentSearch}>Save</Button>
            </div>
          </CardContent>
        </Card>

        {/* Saved Searches List */}
        <div className="space-y-4">
          {savedSearches.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No saved searches yet</p>
            </div>
          ) : (
            savedSearches.map((search) => (
              <Card key={search.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{search.name}</h3>
                      <p className="text-sm text-gray-500">
                        Saved on {new Date(search.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleNotifications(search.id)}
                        className={search.notifications ? 'bg-blue-50' : ''}
                      >
                        <Bell className={`h-4 w-4 ${search.notifications ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSearch(search.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {search.keyword && <Badge variant="secondary">Keyword: {search.keyword}</Badge>}
                    {search.location && <Badge variant="secondary">Location: {search.location}</Badge>}
                    {search.role && <Badge variant="secondary">Role: {search.role}</Badge>}
                    {search.salary && <Badge variant="secondary">Salary: {search.salary}</Badge>}
                  </div>

                  <Button onClick={() => applySearch(search)} className="w-full">
                    Apply This Search
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
