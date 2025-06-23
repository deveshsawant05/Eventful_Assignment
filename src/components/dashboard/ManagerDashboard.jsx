'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Search, 
  Check, 
  X, 
  Eye, 
  Filter, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { submissions } from '@/data/submissions';
import { useToast } from '@/hooks/use-toast';

export function ManagerDashboard() {
  const [submissionList, setSubmissionList] = useState(submissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { toast } = useToast();

  const handleApprove = (id) => {
    setSubmissionList(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'approved' } : sub
      )
    );
    toast({
      title: "Artist Approved",
      description: "The artist has been approved and notified.",
    });
  };

  const handleReject = (id) => {
    setSubmissionList(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'rejected' } : sub
      )
    );
    toast({
      title: "Artist Rejected",
      description: "The artist application has been rejected.",
      variant: "destructive",
    });
  };

  const filteredSubmissions = submissionList.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const stats = {
    total: submissionList.length,
    pending: submissionList.filter(s => s.status === 'pending').length,
    approved: submissionList.filter(s => s.status === 'approved').length,
    rejected: submissionList.filter(s => s.status === 'rejected').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Manager Dashboard
        </h1>
        <p className="text-muted-foreground">
          Review and manage artist applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Artist Submissions ({filteredSubmissions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artist</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Fee Range</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No submissions found matching your criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{submission.name}</div>
                          <div className="text-sm text-muted-foreground">{submission.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.category.slice(0, 2).map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                          {submission.category.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{submission.category.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {submission.location}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {submission.feeRange}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(submission.submittedAt)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(submission.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedSubmission(submission)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{submission.name}</DialogTitle>
                                <DialogDescription>
                                  Artist application details
                                </DialogDescription>
                              </DialogHeader>
                              {selectedSubmission && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium text-foreground">Email</h4>
                                      <p className="text-sm text-muted-foreground">{selectedSubmission.email}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-foreground">Location</h4>
                                      <p className="text-sm text-muted-foreground">{selectedSubmission.location}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-foreground">Fee Range</h4>
                                      <p className="text-sm text-muted-foreground">{selectedSubmission.feeRange}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-foreground">Languages</h4>
                                      <p className="text-sm text-muted-foreground">{selectedSubmission.languages.join(', ')}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-foreground">Categories</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      {selectedSubmission.category.map((cat) => (
                                        <Badge key={cat} variant="secondary">
                                          {cat}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-foreground">Bio</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{selectedSubmission.bio}</p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {submission.status === 'pending' && (
                            <>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Approve Artist</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to approve {submission.name}? They will be notified and can start receiving bookings.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleApprove(submission.id)}
                                      className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                                    >
                                      Approve
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Reject Artist</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to reject {submission.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleReject(submission.id)}
                                      className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                      Reject
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}