import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { createCompany } from '@/services/companyService';
import { fetchSectors } from '@/services/sectorService';
import LogoUploader from '@/components/features/companies/LogoUploader';

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Company name is required' }),
  tradingName: z.string().optional(),
  sector: z.string().min(1, { message: 'Sector is required' }),
  subsector: z.string().min(1, { message: 'Subsector is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  foundedYear: z.number().positive().optional().nullable().transform(val => val === null ? undefined : val),
  registrationId: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const countries = [
  'United States',
  'Germany',
  'United Kingdom',
  'France',
  'Spain',
  'Italy',
  'Canada',
  'Australia',
  'Japan',
  'China',
  'Brazil',
  'Mexico'
];

const CompanyAdd: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  // Fetch sectors data
  const { data: sectors = [], isLoading: loadingSectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: fetchSectors
  });

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
    }
  });

  // Watch for sector changes to update subsector options
  const selectedSector = form.watch('sector');
  const selectedSectorData = sectors.find(sector => sector.name === selectedSector);
  const subsectors = selectedSectorData?.subsectors || [];

  // Handle logo changes
  const handleLogoChange = (file: File | null, preview: string | null) => {
    setLogoFile(file);
    setLogoPreview(preview);
  };

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    try {
      // Ensure the required fields are present (they should be due to zod validation)
      // Create company with the form values - explicitly indicating required fields
      const createdCompany = await createCompany({
        name: values.name, // explicitly mark as required
        sector: values.sector, // explicitly mark as required
        subsector: values.subsector, // explicitly mark as required
        country: values.country, // explicitly mark as required
        tradingName: values.tradingName,
        foundedYear: values.foundedYear,
        registrationId: values.registrationId,
        website: values.website,
        description: values.description,
        logoUrl: logoPreview || undefined
      });
      
      toast({
        title: t('companies.create.success'),
        description: t('companies.create.successMessage'),
      });
      
      // Navigate to the company details page
      navigate(`/companies/${createdCompany.id}`);
    } catch (error) {
      console.error('Error creating company:', error);
      
      toast({
        variant: 'destructive',
        title: t('companies.create.error'),
        description: t('companies.create.errorMessage'),
      });
    }
  };

  return (
    <DashboardLayout title={t('companies.create.title')}>
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('companies.create.title')}</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Company logo */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium">{t('companies.detail.logo')}</h2>
              <LogoUploader initialLogo={logoPreview} onLogoChange={handleLogoChange} />
            </div>

            {/* Company information */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium">{t('companies.detail.information')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('companies.detail.name')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('companies.detail.namePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Trading name */}
                <FormField
                  control={form.control}
                  name="tradingName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('companies.detail.tradingName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('companies.detail.tradingNamePlaceholder')} {...field} />
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
                      <FormLabel>{t('companies.detail.sector')} *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value} 
                        disabled={loadingSectors}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('companies.detail.selectSector')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sectors.map((sector) => (
                            <SelectItem key={sector.name} value={sector.name}>
                              {sector.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subsector */}
                <FormField
                  control={form.control}
                  name="subsector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('companies.detail.subsector')} *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value} 
                        disabled={!selectedSector}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('companies.detail.selectSubsector')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subsectors.map((subsector) => (
                            <SelectItem key={subsector} value={subsector}>
                              {subsector}
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
                      <FormLabel>{t('companies.detail.country')} *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('companies.detail.selectCountry')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Founded year */}
                <FormField
                  control={form.control}
                  name="foundedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('companies.detail.foundedYear')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder={t('companies.detail.foundedYearPlaceholder')}
                          {...field}
                          value={field.value || ''}
                          onChange={e => {
                            const value = e.target.value;
                            field.onChange(value ? parseInt(value, 10) : null);
                          }}
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
                      <FormLabel>{t('companies.detail.registrationId')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('companies.detail.registrationIdPlaceholder')} {...field} />
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
                      <FormLabel>{t('companies.detail.website')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('companies.detail.websitePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('companies.detail.description')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('companies.detail.descriptionPlaceholder')}
                        className="resize-none h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form actions */}
            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/companies')}
              >
                {t('common.cancel')}
              </Button>
              <Button type="submit">{t('companies.create.submit')}</Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default CompanyAdd;
