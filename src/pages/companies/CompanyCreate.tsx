
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import LogoUploader from '@/components/features/companies/LogoUploader';

import { createCompany } from '@/services/companyService';
import { fetchSectors, fetchSubsectorsBySectorId, Subsector } from '@/services/sectorService';

// Form schema validation using zod
const createCompanySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  tradingName: z.string().optional(),
  sector: z.string().min(1, { message: "Sector is required" }),
  subsector: z.string().min(1, { message: "Subsector is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  foundedYear: z.coerce.number().positive().int().optional(),
  registrationId: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
});

type CreateCompanyFormValues = z.infer<typeof createCompanySchema>;

const CompanyCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State for managing subsectors based on selected sector
  const [subsectors, setSubsectors] = useState<Subsector[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);

  // React Hook Form with Zod validation
  const form = useForm<CreateCompanyFormValues>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: '',
      tradingName: '',
      sector: '',
      subsector: '',
      country: '',
      foundedYear: undefined,
      registrationId: '',
      website: '',
      description: '',
      logoUrl: undefined,
    },
  });
  
  // Get current sector value for subsector loading
  const currentSector = form.watch('sector');

  // Query for fetching sectors
  const { data: sectors, isLoading: isLoadingSectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: fetchSectors
  });

  // Query for fetching subsectors when sector changes
  const { data: subsectorsData, isLoading: isLoadingSubsectors } = useQuery({
    queryKey: ['subsectors', currentSector],
    queryFn: () => fetchSubsectorsBySectorId(currentSector),
    enabled: !!currentSector,
  });

  // Update subsectors when data is fetched
  useEffect(() => {
    if (subsectorsData) {
      setSubsectors(subsectorsData);
    }
  }, [subsectorsData]);
  
  // When sector changes, reset subsector value
  useEffect(() => {
    if (currentSector) {
      form.setValue('subsector', '');
    }
  }, [currentSector, form]);
  
  // Update form value when logo changes
  useEffect(() => {
    form.setValue('logoUrl', logoUrl);
  }, [logoUrl, form]);

  // Mutation for creating a company
  const createCompanyMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      toast.success(t('companies.create.success'));
      navigate(`/companies/${data.id}`);
    },
    onError: () => {
      toast.error(t('companies.create.error'));
    }
  });

  // Handle form submission
  const onSubmit = (data: CreateCompanyFormValues) => {
    // Update logo url before submitting
    const finalData = {
      ...data,
      logoUrl,
    };
    createCompanyMutation.mutate(finalData);
  };

  // Navigate back to companies list
  const handleBack = () => {
    navigate('/companies');
  };

  return (
    <DashboardLayout title={t('companies.create.title')}>
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
        {/* Header with back button and title */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">{t('companies.create.title')}</h1>
        </div>

        {/* Create company form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Logo upload */}
          <div className="bg-white p-6 rounded-lg border flex flex-col items-center">
            <LogoUploader
              value={logoUrl}
              onChange={setLogoUrl}
              companyName={form.watch('name')}
            />
          </div>
          
          {/* Middle and right columns - Form fields */}
          <div className="lg:col-span-2 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Form content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left form column */}
                  <div className="space-y-6 bg-white p-6 rounded-lg border">
                    <h3 className="font-medium text-lg border-b pb-2">{t('companies.sections.general')}</h3>
                    
                    {/* Company Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.create.companyName')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Trading Name */}
                    <FormField
                      control={form.control}
                      name="tradingName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.tradingName')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Sector */}
                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.sector')}</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={isLoadingSectors}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('companies.create.selectSector')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sectors?.map((sector) => (
                                <SelectItem key={sector.id} value={sector.id}>
                                  {sector.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Subsector (only enabled when sector is selected) */}
                    <FormField
                      control={form.control}
                      name="subsector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.subsector')}</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={!currentSector || isLoadingSubsectors}
                          >
                            <FormControl>
                              <SelectTrigger>
                                {isLoadingSubsectors ? (
                                  <div className="flex items-center">
                                    <Loader2 size={16} className="mr-2 animate-spin" />
                                    {t('companies.create.loadingSubsectors')}
                                  </div>
                                ) : (
                                  <SelectValue placeholder={t('companies.create.selectSubsector')} />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subsectors.map((subsector) => (
                                <SelectItem key={subsector.id} value={subsector.id}>
                                  {subsector.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Country */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.country')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Right form column */}
                  <div className="space-y-6 bg-white p-6 rounded-lg border">
                    <h3 className="font-medium text-lg border-b pb-2">{t('companies.sections.details')}</h3>
                    
                    {/* Founded Year */}
                    <FormField
                      control={form.control}
                      name="foundedYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.foundedYear')}</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              value={field.value || ''} 
                              onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Registration ID */}
                    <FormField
                      control={form.control}
                      name="registrationId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.registrationId')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Website */}
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.website')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('companies.fields.description')}</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Form submission */}
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={createCompanyMutation.isPending}
                  >
                    {createCompanyMutation.isPending && (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    )}
                    {t('companies.create.submit')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyCreate;
