import { EmergencyContact } from '../types';

// Clean initial emergency contacts - no temporary or mock contacts
export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [];

const STORAGE_KEY = 'farishta_emergency_contacts_v2';

export function loadEmergencyContacts(): EmergencyContact[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Clean up legacy temporary contacts from storage if present
      localStorage.removeItem('farishta_emergency_contacts_v1');
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filter out any previous temporary mock contacts
      return parsed.filter(
        (c) =>
          c &&
          c.id !== 'contact-fatima' &&
          c.id !== 'contact-tariq' &&
          c.id !== 'contact-bilal' &&
          !c.id.startsWith('pb-')
      );
    }
  } catch (err) {
    console.warn('Failed to load emergency contacts from localStorage', err);
  }
  return [];
}

export function saveEmergencyContacts(contacts: EmergencyContact[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (err) {
    console.warn('Failed to save emergency contacts to localStorage', err);
  }
}

/**
 * Universal vCard (.vcf) phone contact parser
 * Allows direct import from phone contacts export
 */
export function parseVCard(vcfText: string): Array<{ name: string; phone: string }> {
  const contacts: Array<{ name: string; phone: string }> = [];
  const cards = vcfText.split(/BEGIN:VCARD/i).slice(1);

  for (const card of cards) {
    let name = '';
    let phone = '';

    // Match FN (Full Name) or N (Structured Name)
    const fnMatch = card.match(/FN[^\:]*:(.*?)(\r\n|\r|\n)/i);
    if (fnMatch && fnMatch[1]) {
      name = fnMatch[1].trim();
    } else {
      const nMatch = card.match(/N[^\:]*:(.*?)(\r\n|\r|\n)/i);
      if (nMatch && nMatch[1]) {
        const parts = nMatch[1].split(';').filter(Boolean);
        name = parts.reverse().join(' ').trim();
      }
    }

    // Match TEL (Phone number)
    const telMatch = card.match(/TEL[^\:]*:(.*?)(\r\n|\r|\n)/i);
    if (telMatch && telMatch[1]) {
      phone = telMatch[1].trim();
    }

    if (name || phone) {
      contacts.push({
        name: name || 'Phone Contact',
        phone: phone || '',
      });
    }
  }

  return contacts;
}
