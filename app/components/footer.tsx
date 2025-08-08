import Link from 'next/link';
import { Leaf, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-moss-green-800 text-white">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-black">
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Leaf />
            <span className="text-xl font-bold">RegimenHub</span>
          </Link>
          <p className="text-gray-400 text-sm">
            Harnessing the power of nature to help you achieve your wellness goals.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4 tracking-wider uppercase">Navigate</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/stacks" className="text-gray-400 hover:text-white transition-colors">Stacks</Link></li>
            <li><Link href="/influencers" className="text-gray-400 hover:text-white transition-colors">Influencers</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 tracking-wider uppercase">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4 tracking-wider uppercase">Follow</h3>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="container text-center text-gray-500 text-xs flex flex-col sm:flex-row justify-between items-center py-4">
          <span>© 2025 RegimenHub. All Rights Reserved.</span>
          <div className="mt-2 sm:mt-0">
            <Link href="#" className="hover:text-white mx-2 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white mx-2 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
