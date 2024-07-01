//import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/firebase';

function Navigation() {
  return (
    <nav>
      <div className='border-b mb-2'>
        <Button variant="ghost" asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/login" onClick={() => auth.signOut()}>Logout</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/system">System</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;
