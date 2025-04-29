
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Building, Edit, Save, X, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/utils/formatters';
import { fetchCompanyById } from '@/services/companyService';
import { Company } from '@/types/company';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyData, setCompanyData] = useState<Company | null>(null);

  // Fetch company details
  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company', id],
    queryFn: () => id ? fetchCompanyById(id) : Promise.reject('Invalid ID'),
    onSuccess: (data) => {
      if (!companyData) {
        setCompanyData(data);
      }
    }
  });

  // Handle edit toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // If we're saving changes, update the company data
      // In a real app, this would make an API call
      console.log('Saving company data:', companyData);
      // For demo purposes, we're just toggling the edit state
    }
    setIsEditing(!isEditing);
  };

  // Handle input changes when editing
  const handleInputChange = (field: keyof Company, value: any) => {
    if (companyData) {
      setCompanyData({
        ...companyData,
        [field]: value
      });
    }
  };

  // Handle delete confirmation
  const handleDelete = () => {
    console.log('Deleting company:', id);
    // In a real app, this would make an API call
    // For demo purposes, just navigate back
    setIsDeleteDialogOpen(false);
    navigate('/companies');
  };

  // Navigate back to companies list
  const handleBack = () => {
    navigate('/companies');
  };

  // Get company initials for avatar
  const getCompanyInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // UI elements for loading and error states
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft size={16} />
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !company) {
    return (
      <DashboardLayout>
        <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack}>
              <ArrowLeft size={16} />
            </Button>
            <h1 className="text-2xl font-bold">{t('companies.error')}</h1>
          </div>
          <div className="p-6 border border-red-200 bg-red-50 text-red-700 rounded-md">
            {t('companies.detailsError')}
          </div>
          <Button onClick={handleBack}>{t('common.back')}</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
        {/* Header with back button and title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack}>
              <ArrowLeft size={16} />
            </Button>
            <h1 className="text-2xl font-bold">{company.name}</h1>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X size={16} className="mr-2" />
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleEditToggle}>
                  <Save size={16} className="mr-2" />
                  {t('common.save')}
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleEditToggle}>
                <Edit size={16} className="mr-2" />
                {t('common.edit')}
              </Button>
            )}
          </div>
        </div>

        {/* Company details tabs */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="info">{t('companies.tabs.info')}</TabsTrigger>
            <TabsTrigger value="valuations">{t('companies.tabs.valuations')}</TabsTrigger>
            <TabsTrigger value="users">{t('companies.tabs.users')}</TabsTrigger>
          </TabsList>

          {/* Company Information Tab */}
          <TabsContent value="info" className="space-y-6">
            {/* Company header with logo and name */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 bg-white rounded-lg border">
              <Avatar className="h-24 w-24 rounded-md bg-white border">
                {company.logoUrl ? (
                  <AvatarImage 
                    src={company.logoUrl} 
                    alt={company.name} 
                    className="object-contain p-1"
                  />
                ) : (
                  <AvatarFallback className="text-2xl rounded-md">
                    {getCompanyInitials(company.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <Input 
                    value={companyData?.name || ''} 
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-xl font-bold mb-2"
                  />
                ) : (
                  <h2 className="text-xl font-bold mb-2">{company.name}</h2>
                )}
                {company.tradingName && (
                  <div className="text-muted-foreground">
                    {isEditing ? (
                      <Input 
                        value={companyData?.tradingName || ''} 
                        onChange={(e) => handleInputChange('tradingName', e.target.value)}
                        placeholder={t('companies.fields.tradingName')}
                        className="text-sm"
                      />
                    ) : (
                      <span>{company.tradingName}</span>
                    )}
                  </div>
                )}
                {company.latestValuation && (
                  <div className="mt-2 text-primary font-medium">
                    {t('companies.latestValuation')}: {formatCurrency(company.latestValuation.value)}
                  </div>
                )}
              </div>
            </div>

            {/* Company details form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6 bg-white p-6 rounded-lg border">
                <h3 className="font-medium text-lg border-b pb-2">{t('companies.sections.general')}</h3>

                {/* Sector */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t('companies.fields.sector')}</label>
                  {isEditing ? (
                    <Input 
                      value={companyData?.sector || ''} 
                      onChange={(e) => handleInputChange('sector', e.target.value)}
                    />
                  ) : (
                    <div className="bg-muted/50 p-2 rounded text-sm">{company.sector}</div>
                  )}
                </div>

                {/* Subsector */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t('companies.fields.subsector')}</label>
                  {isEditing ? (
                    <Input 
                      value={companyData?.subsector || ''} 
                      onChange={(e) => handleInputChange('subsector', e.target.value)}
                    />
                  ) : (
                    <div className="bg-muted/50 p-2 rounded text-sm">{company.subsector}</div>
                  )}
                </div>

                {/* Country */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t('companies.fields.country')}</label>
                  {isEditing ? (
                    <Input 
                      value={companyData?.country || ''} 
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  ) : (
                    <div className="bg-muted/50 p-2 rounded text-sm">{company.country}</div>
                  )}
                </div>

                {/* Founded Year */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t('companies.fields.foundedYear')}</label>
                  {isEditing ? (
                    <Input 
                      type="number"
                      value={companyData?.foundedYear || ''} 
                      onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value) || undefined)}
                    />
                  ) : (
                    <div className="bg-muted/50 p-2 rounded text-sm">
                      {company.foundedYear || t('common.notSpecified')}
                    </div>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6 bg-white p-6 rounded-lg border">
                <h3 className="font-medium text-lg border-b pb-2">{t('companies.sections.details')}</h3>

                {/* Registration ID */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t('companies.fields.registrationId')}</label>
                  {isEditing ? (
                    <Input 
                      value={companyData?.registrationId || ''} 
                      onChange={(e) => handleInputChange('registrationId', e.target.value)}
                    />
                  ) : (
                    <div className="bg-muted/50 p-2 rounded text-sm">
                      {company.registrationId || t('common.notSpecified')}
                    </div>
                  )}
                </div>

                {/* Website */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t('companies.fields.website')}</label>
                  {isEditing ? (
                    <Input 
                      value={companyData?.website || ''} 
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  ) : (
                    <div className="bg-muted/50 p-2 rounded text-sm">
                      {company.website ? (
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {company.website}
                        </a>
                      ) : (
                        t('common.notSpecified')
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t('companies.fields.description')}</label>
                  {isEditing ? (
                    <Textarea 
                      value={companyData?.description || ''} 
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  ) : (
                    <div className="bg-muted/50 p-2 rounded text-sm min-h-[100px]">
                      {company.description || t('common.notSpecified')}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Delete company button (only shown when not editing) */}
            {!isEditing && (
              <div className="flex justify-end pt-4">
                <Button 
                  variant="destructive" 
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 size={16} className="mr-2" />
                  {t('companies.delete')}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Valuations Tab */}
          <TabsContent value="valuations">
            <div className="bg-white p-6 rounded-lg border min-h-[300px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">{t('companies.tabs.valuations')}</h3>
                <Button>
                  {t('valuations.new')}
                </Button>
              </div>
              <div className="text-center text-muted-foreground py-12">
                <Building size={48} className="mx-auto mb-4 text-muted-foreground/60" />
                <p>{t('valuations.empty')}</p>
                <Button variant="outline" className="mt-4">
                  {t('valuations.create')}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="bg-white p-6 rounded-lg border min-h-[300px]">
              <h3 className="font-medium text-lg mb-6">{t('companies.tabs.users')}</h3>
              <div className="text-center text-muted-foreground py-12">
                <p>{t('users.empty')}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('companies.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('companies.deleteDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default CompanyDetails;
