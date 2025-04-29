
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Edit, Save, X, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Company } from '@/types/company';
import { fetchCompanyById, updateCompany, deleteCompany } from '@/services/companyService';
import LogoUploader from '@/components/features/companies/LogoUploader';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Fetch company data
  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company', id],
    queryFn: () => fetchCompanyById(id as string),
    enabled: !!id
  });

  // Update local state when company data is fetched
  useEffect(() => {
    if (company) {
      setCompanyData(company);
      if (company.logoUrl) {
        setLogoPreview(company.logoUrl);
      }
    }
  }, [company]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (companyData) {
      setCompanyData({
        ...companyData,
        [name]: value
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (companyData) {
      setCompanyData({
        ...companyData,
        [name]: value ? parseInt(value, 10) : undefined
      });
    }
  };

  const handleLogoChange = (file: File | null, preview: string | null) => {
    setLogoFile(file);
    setLogoPreview(preview);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      if (company) {
        setCompanyData(company);
        setLogoPreview(company.logoUrl || null);
      }
      setLogoFile(null);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!companyData) return;

    try {
      const updatedCompany = { ...companyData };
      if (logoFile) {
        // In a real app, you would upload the file and get a URL
        // For this mock, we'll pretend the logo was uploaded and use the preview
        updatedCompany.logoUrl = logoPreview || undefined;
      }

      await updateCompany(updatedCompany);
      
      toast({
        title: t('companies.detail.updateSuccess'),
        description: t('companies.detail.updateSuccessMessage'),
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: t('companies.detail.updateError'),
        description: t('companies.detail.updateErrorMessage'),
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteCompany(id);
      
      toast({
        title: t('companies.detail.deleteSuccess'),
        description: t('companies.detail.deleteSuccessMessage'),
      });
      
      navigate('/companies');
    } catch (error) {
      toast({
        title: t('companies.detail.deleteError'),
        description: t('companies.detail.deleteErrorMessage'),
        variant: 'destructive',
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleGoBack = () => {
    navigate('/companies');
  };

  if (isLoading) {
    return (
      <DashboardLayout title={t('companies.detail.title')}>
        <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('header.breadcrumbs.goBack')}
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-32 w-32 rounded-md" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !companyData) {
    return (
      <DashboardLayout title={t('companies.detail.title')}>
        <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('header.breadcrumbs.goBack')}
            </Button>
          </div>
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <h2 className="text-lg font-medium">{t('companies.detail.errorLoading')}</h2>
                <p className="text-muted-foreground mt-2">{t('companies.detail.tryAgain')}</p>
                <Button onClick={handleGoBack} className="mt-4">
                  {t('header.breadcrumbs.goBack')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={companyData.name}>
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleGoBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('header.breadcrumbs.goBack')}
          </Button>
          <h1 className="text-2xl font-bold">{companyData.name}</h1>
        </div>
        
        {/* Company Details Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('companies.detail.companyDetails')}</CardTitle>
              <CardDescription>{t('companies.detail.companyInfo')}</CardDescription>
            </div>
            <div className="space-x-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="ml-2">
                    <Save className="h-4 w-4 mr-2" />
                    {t('companies.detail.save')}
                  </Button>
                  <Button variant="outline" onClick={handleEditToggle}>
                    <X className="h-4 w-4 mr-2" />
                    {t('companies.detail.cancel')}
                  </Button>
                </>
              ) : (
                <Button onClick={handleEditToggle}>
                  <Edit className="h-4 w-4 mr-2" />
                  {t('companies.detail.edit')}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo section */}
            <div className="flex flex-col items-center sm:items-start space-y-4">
              {isEditing ? (
                <LogoUploader 
                  initialLogo={logoPreview} 
                  onLogoChange={handleLogoChange} 
                />
              ) : (
                logoPreview ? (
                  <div className="w-32 h-32 rounded-md border flex items-center justify-center overflow-hidden bg-gray-50">
                    <img 
                      src={logoPreview} 
                      alt={`${companyData.name} logo`} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-md border flex items-center justify-center bg-gray-50 text-muted-foreground">
                    {t('companies.detail.noLogo')}
                  </div>
                )
              )}
            </div>
            
            {/* Company fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.table.name')}</label>
                {isEditing ? (
                  <Input 
                    name="name"
                    value={companyData.name || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-base">{companyData.name}</p>
                )}
              </div>
              
              {/* Trading Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.detail.tradingName')}</label>
                {isEditing ? (
                  <Input 
                    name="tradingName"
                    value={companyData.tradingName || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-base">{companyData.tradingName || '-'}</p>
                )}
              </div>
              
              {/* Sector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.table.sector')}</label>
                {isEditing ? (
                  <Input 
                    name="sector"
                    value={companyData.sector || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-base">{companyData.sector}</p>
                )}
              </div>
              
              {/* Subsector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.detail.subsector')}</label>
                {isEditing ? (
                  <Input 
                    name="subsector"
                    value={companyData.subsector || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-base">{companyData.subsector}</p>
                )}
              </div>
              
              {/* Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.table.country')}</label>
                {isEditing ? (
                  <Input 
                    name="country"
                    value={companyData.country || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <p className="text-base">{companyData.country}</p>
                )}
              </div>
              
              {/* Founded Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.detail.foundedYear')}</label>
                {isEditing ? (
                  <Input 
                    type="number"
                    name="foundedYear"
                    value={companyData.foundedYear || ''}
                    onChange={handleNumberChange}
                  />
                ) : (
                  <p className="text-base">{companyData.foundedYear || '-'}</p>
                )}
              </div>
              
              {/* Registration ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.detail.registrationId')}</label>
                {isEditing ? (
                  <Input 
                    name="registrationId"
                    value={companyData.registrationId || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-base">{companyData.registrationId || '-'}</p>
                )}
              </div>
              
              {/* Website */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('companies.detail.website')}</label>
                {isEditing ? (
                  <Input 
                    name="website"
                    value={companyData.website || ''}
                    onChange={handleInputChange}
                    type="url"
                  />
                ) : companyData.website ? (
                  <a 
                    href={companyData.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-base"
                  >
                    {companyData.website}
                  </a>
                ) : (
                  <p className="text-base">-</p>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2 col-span-full">
              <label className="text-sm font-medium">{t('companies.detail.description')}</label>
              {isEditing ? (
                <Textarea 
                  name="description"
                  value={companyData.description || ''}
                  onChange={handleInputChange}
                  rows={4}
                />
              ) : (
                <p className="text-base whitespace-pre-line">{companyData.description || '-'}</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Valuations Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('companies.detail.valuations')}</CardTitle>
            <CardDescription>{t('companies.detail.valuationsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Input 
                placeholder={t('companies.detail.searchValuations')} 
                className="max-w-sm"
              />
              <Button>
                {t('companies.detail.newValuation')}
              </Button>
            </div>
            
            {/* Valuations table placeholder */}
            <div className="rounded-md border">
              <div className="py-10 text-center">
                <p className="text-muted-foreground">{t('companies.detail.noValuations')}</p>
                <Button variant="outline" className="mt-4">
                  {t('companies.detail.createFirstValuation')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Users Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('companies.detail.users')}</CardTitle>
            <CardDescription>{t('companies.detail.usersDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div></div> {/* Empty div for spacing */}
              <Button>
                {t('companies.detail.inviteUser')}
              </Button>
            </div>
            
            {/* Users table placeholder */}
            <div className="rounded-md border">
              <div className="py-10 text-center">
                <p className="text-muted-foreground">{t('companies.detail.noUsers')}</p>
                <Button variant="outline" className="mt-4">
                  {t('companies.detail.inviteFirstUser')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Delete Company Button */}
        <div className="flex justify-end pt-4">
          <Button 
            variant="destructive" 
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t('companies.detail.deleteCompany')}
          </Button>
        </div>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('companies.detail.deleteCompanyConfirm')}</DialogTitle>
              <DialogDescription>
                {t('companies.detail.deleteCompanyDescription')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                {t('companies.detail.cancel')}
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                {t('companies.detail.delete')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDetails;
