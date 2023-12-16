import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { HasID, HasParams } from '@/app/lib/definitions';
import { notFound } from 'next/navigation';

const Page: React.FC<HasParams<HasID>> = async ({ params: { id } }) => {
  const customersPromise = fetchCustomers();
  const invoicePromise = fetchInvoiceById(id);
  const [customers, invoice] = await Promise.all([
    customersPromise,
    invoicePromise,
  ]);

  if (!invoice) notFound();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Update Invoice',
            href: `/dashboard/invoices/${invoice.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
};

export default Page;
