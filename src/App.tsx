import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  Compass,
  Star,
  Shield,
  Lightbulb,
  Target,
  Monitor
} from 'lucide-react';
import AdminPage from './pages/AdminPage';

// Types
interface Counselor {
  id: string;
  name: string;
  credentials: string;
  image: string;
  locations: string[];
  bio: string;
  specialties: string[];
  insuranceAccepted: string[];
}

interface CounselingType {
  id: string;
  title: string;
  services: string[];
}

interface InsuranceProvider {
  id: string;
  name: string;
  logo: string;
}

// Helper function to get phone number for location
const getPhoneForLocation = (location: string): string => {
  switch (location) {
    case 'Niceville':
      return '850-279-4576';
    case 'Crestview':
      return '850-353-2677';
    case 'Telehealth':
      return '850-279-4576';
    default:
      return '850-279-4576';
  }
};

// Initial counselors data
const initialCounselors: Counselor[] = [
  {
    id: '1',
    name: 'Nannette Borland',
    credentials: 'LCSW-S',
    image: '/Nanette-Borland.jpg',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Nannette Borland is a Licensed Clinical Social Worker-Supervisor with over 20 years of experience in mental health and substance abuse counseling. She has worked in various settings including community mental health, private practice, and hospital-based programs. Nannette specializes in trauma-informed care, addiction recovery, and family therapy. She is passionate about helping individuals and families heal from past wounds and develop healthy coping strategies. Nannette integrates Christian principles into her therapeutic approach, believing that faith can be a powerful source of strength and healing.',
    specialties: [
      'Trauma-informed care',
      'Addiction recovery',
      'Family therapy',
      'Substance abuse counseling',
      'Christian counseling integration'
    ],
    insuranceAccepted: ['Aetna', 'Florida Blue', 'Medicare', 'Tricare', 'United Healthcare', 'UMR', 'VACCN']
  },
  {
    id: '2',
    name: 'Daniel Williams',
    credentials: 'Clinical Social Worker Intern',
    image: '/Daniel-Williams.jpeg',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Daniel Williams is a Clinical Social Worker Intern currently pursuing his Master\'s degree in Social Work. He brings a fresh perspective and enthusiasm to the field of mental health counseling. Daniel has experience working with individuals struggling with anxiety, depression, and life transitions. He is particularly interested in men\'s mental health issues and helping clients develop emotional intelligence and healthy relationships. Daniel believes in the importance of creating a safe, non-judgmental space where clients can explore their thoughts and feelings while incorporating their faith journey into the healing process.',
    specialties: [
      'Men\'s mental health',
      'Anxiety and depression',
      'Life transitions',
      'Emotional intelligence development',
      'Relationship counseling'
    ],
    insuranceAccepted: ['Reduced rate services available']
  },
  {
    id: '3',
    name: 'Aileen Playter',
    credentials: 'LMHC',
    image: '/Aileen-Playter.jpg',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Aileen Playter is a Licensed Mental Health Counselor with extensive experience in treating anxiety, depression, and trauma-related disorders. She has worked with diverse populations including children, adolescents, and adults. Aileen specializes in cognitive-behavioral therapy, mindfulness-based interventions, and faith-integrated counseling. She is passionate about helping clients discover their inner strength and resilience while drawing upon their spiritual resources. Aileen believes that healing occurs when individuals feel heard, understood, and supported in a therapeutic relationship grounded in compassion and hope.',
    specialties: [
      'Anxiety and depression',
      'Trauma-related disorders',
      'Cognitive-behavioral therapy',
      'Mindfulness-based interventions',
      'Faith-integrated counseling'
    ],
    insuranceAccepted: ['Aetna', 'Florida Blue', 'Medicare', 'Tricare', 'United Healthcare', 'UMR', 'VACCN']
  },
  {
    id: '4',
    name: 'Eva McLemore',
    credentials: 'Registered Clinical Social Worker Intern',
    image: '/Eva-McLemore.jpg',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Eva McLemore is a Registered Clinical Social Worker Intern who is passionate about working with young adults and college students. She has experience in crisis intervention, grief counseling, and helping individuals navigate major life transitions. Eva specializes in working with clients who are struggling with identity issues, relationship difficulties, and academic stress. She believes in the power of storytelling and narrative therapy to help clients reframe their experiences and discover new possibilities for their lives. Eva integrates Christian values into her practice while respecting each client\'s unique spiritual journey.',
    specialties: [
      'Young adult counseling',
      'Crisis intervention',
      'Grief counseling',
      'Identity development',
      'Narrative therapy'
    ],
    insuranceAccepted: ['Reduced rate services available']
  },
  {
    id: '5',
    name: 'Molly Butler',
    credentials: 'Registered Clinical Social Worker Intern',
    image: '/Molly-Butler.jpeg',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Molly Butler is a Registered Clinical Social Worker Intern with a heart for family therapy and child counseling. She has experience working with families in crisis, children with behavioral issues, and adolescents struggling with emotional regulation. Molly specializes in play therapy, family systems therapy, and trauma-informed care. She believes that families are the cornerstone of healing and works to strengthen family bonds while addressing individual needs. Molly incorporates Christian principles into her work, helping families discover how their faith can be a source of unity and strength during difficult times.',
    specialties: [
      'Family therapy',
      'Child counseling',
      'Play therapy',
      'Family systems therapy',
      'Behavioral issues'
    ],
    insuranceAccepted: ['Reduced rate services available']
  },
  {
    id: '6',
    name: 'Christine Elisabeth',
    credentials: 'Psy.D with Licensed Mental Health Counselor',
    image: '/Christines-Elisabeth.png',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Christine Elisabeth is a Licensed Mental Health Counselor with specialized training in couples therapy and trauma recovery. She has extensive experience working with survivors of domestic violence, sexual assault, and childhood trauma. Christine is trained in EMDR (Eye Movement Desensitization and Reprocessing) and other evidence-based trauma treatments. She is passionate about helping couples rebuild trust, improve communication, and strengthen their relationships. Christine believes that healing from trauma is possible and that faith can play a crucial role in the recovery process.',
    specialties: [
      'Couples therapy',
      'Trauma recovery',
      'EMDR therapy',
      'Domestic violence recovery',
      'Sexual assault recovery'
    ],
    insuranceAccepted: ['Aetna', 'Florida Blue', 'Medicare', 'Tricare', 'United Healthcare', 'UMR', 'VACCN']
  },
  {
    id: '7',
    name: 'Christina Berry',
    credentials: 'LMHC',
    image: '/Christina-Berry.jpg',
    locations: ['Crestview'],
    bio: 'Christina Berry is a Licensed Mental Health Counselor serving the Crestview community with expertise in anxiety, depression, and mood disorders. She has experience working with individuals across the lifespan and specializes in cognitive-behavioral therapy and solution-focused brief therapy. Christina is passionate about helping clients develop practical coping skills and build resilience. She believes in the importance of addressing both the psychological and spiritual aspects of mental health, helping clients integrate their faith into their healing journey while respecting their individual beliefs and values.',
    specialties: [
      'Anxiety and depression',
      'Mood disorders',
      'Cognitive-behavioral therapy',
      'Solution-focused brief therapy',
      'Resilience building'
    ],
    insuranceAccepted: ['Aetna', 'Florida Blue', 'Medicare', 'Tricare', 'United Healthcare', 'UMR', 'VACCN']
  },
  {
    id: '8',
    name: 'Laura Christianson',
    credentials: 'LCSW',
    image: '/Laura-Christianson.jpg',
    locations: ['Crestview', 'Telehealth'],
    bio: 'Laura Christianson is a Licensed Clinical Social Worker with extensive experience in family therapy and individual counseling. She has worked with families dealing with addiction, mental illness, and relationship conflicts. Laura specializes in systemic family therapy, attachment-based interventions, and crisis counseling. She is passionate about helping families heal from generational trauma and develop healthy patterns of communication and connection. Laura integrates Christian principles into her practice, helping families discover how their faith can strengthen their bonds and provide hope during difficult seasons.',
    specialties: [
      'Family therapy',
      'Addiction counseling',
      'Systemic family therapy',
      'Attachment-based interventions',
      'Generational trauma'
    ],
    insuranceAccepted: ['Aetna', 'Florida Blue', 'Medicare', 'Tricare', 'United Healthcare', 'UMR', 'VACCN']
  },
  {
    id: '9',
    name: 'Debbie Kern',
    credentials: 'LCSW',
    image: '/kern-deborahjpg.jpg',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Debbie Kern is a Licensed Clinical Social Worker with a passion for helping individuals navigate life transitions and personal growth. She has experience working with adults facing career changes, empty nest syndrome, divorce, and other major life adjustments. Debbie specializes in solution-focused therapy, mindfulness-based interventions, and spiritual counseling. She believes that life transitions, while challenging, can be opportunities for growth and transformation. Debbie helps clients discover their strengths and resources while exploring how their faith can provide guidance and comfort during times of change.',
    specialties: [
      'Life transitions',
      'Personal growth',
      'Solution-focused therapy',
      'Mindfulness-based interventions',
      'Spiritual counseling'
    ],
    insuranceAccepted: ['Aetna', 'Florida Blue', 'Medicare', 'Tricare', 'United Healthcare', 'UMR', 'VACCN']
  },
  {
    id: '10',
    name: 'Eileen Moore',
    credentials: 'LMHC',
    image: '/Eileen -moore.jpg',
    locations: ['Crestview', 'Telehealth'],
    bio: 'Eileen Moore is a Licensed Mental Health Counselor providing comprehensive mental health services in the Crestview area. She has experience working with individuals and couples dealing with relationship issues, communication problems, and intimacy concerns. Eileen specializes in emotionally focused therapy for couples, individual therapy for anxiety and depression, and premarital counseling. She is passionate about helping couples build strong, lasting relationships based on mutual respect, understanding, and shared values. Eileen integrates Christian principles into her work while honoring each client\'s unique spiritual journey.',
    specialties: [
      'Couples therapy',
      'Emotionally focused therapy',
      'Relationship counseling',
      'Premarital counseling',
      'Communication skills'
    ],
    insuranceAccepted: ['Aetna', 'Florida Blue', 'Medicare', 'Tricare', 'United Healthcare', 'UMR', 'VACCN']
  },
  {
    id: '11',
    name: 'Addie Lovejoy',
    credentials: 'Registered Mental Health Counseling Intern',
    image: '/addie-lovejoy.jpg',
    locations: ['Niceville', 'Telehealth'],
    bio: 'Addie Lovejoy is a Registered Mental Health Counseling Intern with a special interest in working with young adults and emerging adults. She has experience in college counseling, career counseling, and helping individuals navigate the transition from adolescence to adulthood. Addie specializes in anxiety management, identity development, and relationship counseling. She believes in the importance of helping young adults develop a strong sense of self while building healthy relationships and pursuing their goals. Addie incorporates Christian values into her practice, helping clients explore how their faith can guide their decisions and provide purpose in their lives.',
    specialties: [
      'Young adult counseling',
      'Career counseling',
      'Anxiety management',
      'Identity development',
      'College counseling'
    ],
    insuranceAccepted: ['Reduced rate services available']
  },
  {
    id: '12',
    name: 'Brandy Reese',
    credentials: 'Registered Mental Health Counseling Intern, Certified Trauma Specialist',
    image: '/Brandy-Reese.jpg',
    locations: ['Telehealth'],
    bio: 'Brandy Reese is a Registered Mental Health Counseling Intern and Certified Trauma Specialist who provides specialized telehealth services. She has extensive training in trauma-informed care and specializes in working with survivors of complex trauma, PTSD, and dissociative disorders. Brandy is trained in multiple evidence-based trauma treatments including EMDR, somatic therapies, and cognitive processing therapy. She is passionate about helping trauma survivors reclaim their lives and find healing. Brandy believes that faith can be a powerful resource in trauma recovery and works to help clients integrate their spiritual beliefs into their healing journey while providing culturally sensitive and trauma-informed care.',
    specialties: [
      'Complex trauma',
      'PTSD',
      'EMDR therapy',
      'Somatic therapies',
      'Dissociative disorders'
    ],
    insuranceAccepted: ['Reduced rate services available']
  }
];

const counselingTypes: CounselingType[] = [
  {
    id: '1',
    title: 'Individual Counseling',
    services: ['Anxiety', 'Depression', 'Trauma', 'Life Transition Issues', 'Anger Management', 'Addiction']
  },
  {
    id: '2',
    title: 'Couples Counseling',
    services: ['Communication', 'Intimacy', 'Conflict Management', 'Betrayal', 'Relational Dynamic Issues']
  },
  {
    id: '3',
    title: 'Family Counseling',
    services: ['Communication', 'Parenting', 'Conflict Management', 'Blended Family Issues', 'Life Transition Issues']
  },
  {
    id: '4',
    title: 'Children and Adolescents',
    services: ['ADHD', 'Anxiety', 'Depression', 'Trauma', 'Social Issues']
  }
];

const insuranceProviders: InsuranceProvider[] = [
  {
    id: '1',
    name: 'Aetna',
    logo: '/Aetna.jpeg'
  },
  {
    id: '2',
    name: 'Florida Blue',
    logo: '/FLBCBS.jpeg'
  },
  {
    id: '3',
    name: 'Medicare',
    logo: '/Medicare.jpeg'
  },
  {
    id: '4',
    name: 'Tricare',
    logo: '/Tricare.jpeg'
  },
  {
    id: '5',
    name: 'United Healthcare',
    logo: '/UHC.jpeg'
  },
  {
    id: '6',
    name: 'UMR',
    logo: '/UMR.jpeg'
  }
];

function App() {
  const [counselors, setCounselors] = useState<Counselor[]>(initialCounselors);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [isCounselingTypesOpen, setIsCounselingTypesOpen] = useState(false);
  const [mapLocation, setMapLocation] = useState<{ address: string; name: string } | null>(null);
  const [currentPage, setCurrentPage] = useState<'main' | 'admin'>('main');

  // Check URL for admin page
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentPage('admin');
    }
  }, []);

  // Handle browser navigation
  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPage(path === '/admin' ? 'admin' : 'main');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = () => {
    setCurrentPage('admin');
    window.history.pushState({}, '', '/admin');
  };

  const navigateToMain = () => {
    setCurrentPage('main');
    window.history.pushState({}, '', '/');
  };

  const handleUpdateCounselors = (updatedCounselors: Counselor[]) => {
    setCounselors(updatedCounselors);
  };

  // If on admin page, show admin interface
  if (currentPage === 'admin') {
    return (
      <AdminPage 
        counselors={counselors}
        onUpdateCounselors={handleUpdateCounselors}
      />
    );
  }

  const locations = ['All', 'Niceville', 'Crestview', 'Telehealth'];

  const filteredCounselors = selectedLocation === 'All' 
    ? counselors 
    : counselors.filter(counselor => 
        counselor.locations.includes(selectedLocation)
      );

  const openModal = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
  };

  const closeModal = () => {
    setSelectedCounselor(null);
  };

  const openCounselingTypes = () => {
    setIsCounselingTypesOpen(true);
  };

  const closeCounselingTypes = () => {
    setIsCounselingTypesOpen(false);
  };

  const openMap = (address: string, name: string) => {
    setMapLocation({ address, name });
  };

  const closeMap = () => {
    setMapLocation(null);
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#mission');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation functions for counselor modal
  const navigateToPreviousCounselor = () => {
    if (!selectedCounselor) return;
    
    const currentIndex = filteredCounselors.findIndex(c => c.id === selectedCounselor.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : filteredCounselors.length - 1;
    setSelectedCounselor(filteredCounselors[previousIndex]);
  };

  const navigateToNextCounselor = () => {
    if (!selectedCounselor) return;
    
    const currentIndex = filteredCounselors.findIndex(c => c.id === selectedCounselor.id);
    const nextIndex = currentIndex < filteredCounselors.length - 1 ? currentIndex + 1 : 0;
    setSelectedCounselor(filteredCounselors[nextIndex]);
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed Beach Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/DSC_7225.jpg")',
          zIndex: -1
        }}
      />

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/crosspoint - counseling - logo.png" 
                alt="Crosspoint Counseling" 
                className="h-8 sm:h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#home" className="text-slate-700 transition-colors text-lg xl:text-xl font-body" style={{ color: '#006DD2' }} onMouseEnter={(e) => e.target.style.color = '#0056B3'} onMouseLeave={(e) => e.target.style.color = '#006DD2'}>Home</a>
              <a href="#mission" className="text-slate-700 transition-colors text-lg xl:text-xl font-body" style={{ color: '#006DD2' }} onMouseEnter={(e) => e.target.style.color = '#0056B3'} onMouseLeave={(e) => e.target.style.color = '#006DD2'}>Mission</a>
              <a href="#services" className="text-slate-700 transition-colors text-lg xl:text-xl font-body" style={{ color: '#006DD2' }} onMouseEnter={(e) => e.target.style.color = '#0056B3'} onMouseLeave={(e) => e.target.style.color = '#006DD2'}>Services</a>
              <a href="#team" className="text-slate-700 transition-colors text-lg xl:text-xl font-body" style={{ color: '#006DD2' }} onMouseEnter={(e) => e.target.style.color = '#0056B3'} onMouseLeave={(e) => e.target.style.color = '#006DD2'}>Meet our Team</a>
              <a href="#contact" className="text-slate-700 transition-colors text-lg xl:text-xl font-body" style={{ color: '#006DD2' }} onMouseEnter={(e) => e.target.style.color = '#0056B3'} onMouseLeave={(e) => e.target.style.color = '#006DD2'}>Contact</a>
              <a href="#insurance" className="text-white px-6 xl:px-8 py-3 rounded-lg transition-colors text-lg xl:text-xl font-body" style={{ backgroundColor: '#006DD2' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0056B3'} onMouseLeave={(e) => e.target.style.backgroundColor = '#006DD2'}>
                Insurance Accepted
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="text-slate-700 transition-colors text-lg font-body" style={{ color: '#006DD2' }} onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#mission" className="text-slate-700 transition-colors text-lg font-body" style={{ color: '#006DD2' }} onClick={() => setIsMenuOpen(false)}>Mission</a>
                <a href="#services" className="text-slate-700 transition-colors text-lg font-body" style={{ color: '#006DD2' }} onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#team" className="text-slate-700 transition-colors text-lg font-body" style={{ color: '#006DD2' }} onClick={() => setIsMenuOpen(false)}>Meet our Team</a>
                <a href="#contact" className="text-slate-700 transition-colors text-lg font-body" style={{ color: '#006DD2' }} onClick={() => setIsMenuOpen(false)}>Contact</a>
                <a href="#insurance" className="text-white px-6 py-3 rounded-lg transition-colors w-fit text-lg font-body" style={{ backgroundColor: '#006DD2' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0056B3'} onMouseLeave={(e) => e.target.style.backgroundColor = '#006DD2'} onClick={() => setIsMenuOpen(false)}>
                  Insurance Accepted
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen">
        <div className="relative container mx-auto px-4 pt-8 sm:pt-16">
          <div className="w-full lg:w-2/5 lg:ml-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight text-white text-center lg:text-right font-heading">
              <div className="block">Welcome to</div>
              <div className="block">Crosspoint</div>
              <div className="block">Counseling</div>
              <div className="block">Center</div>
            </h1>
          </div>
        </div>

        {/* Large Arrow Down Button - Enhanced Wiggle with Pause */}
        <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToNextSection}
            className="group transition-all duration-300 hover:scale-110 drop-shadow-2xl hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]"
            aria-label="Scroll to next section"
          >
            <ChevronDown 
              className="w-16 h-16 text-white group-hover:text-blue-100 transition-all duration-300 stroke-[4] filter drop-shadow-lg animate-wiggleWithPause"
            />
          </button>
        </div>
      </section>

      {/* Custom Wave Section Break */}
      <div className="relative w-full h-16 sm:h-24 overflow-hidden">
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Combined Mission Section */}
      <section id="mission" className="py-12 sm:py-16 lg:py-20 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-20">
            <div className="relative">
              {/* Desktop: Beach background window, Mobile: Section 2 Image */}
              <div className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl shadow-2xl bg-cover bg-center bg-no-repeat hidden lg:block"
                style={{
                  backgroundImage: 'url("/DSC_7225.jpg")',
                  backgroundAttachment: 'fixed'
                }}
              />
              {/* Mobile Image */}
              <img 
                src="/Section-2-Image.jpg" 
                alt="Peaceful beach scene with sea oats" 
                className="w-full h-64 sm:h-80 lg:hidden rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 text-white p-4 sm:p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#006DD2' }}>
                <p className="font-semibold text-base sm:text-lg font-heading">Biblically Grounded</p>
                <p className="text-blue-100 text-sm sm:text-base font-body">Non-Judgmental Care</p>
              </div>
            </div>
            <div>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed">
                <p className="font-body">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading" style={{ color: '#006DD2' }}>Crosspoint Counseling Center</span> is a community resource open to all people. We believe true healing begins with the transforming power of Christ. We are an evidence based center guided by a mission to reflect God's love through compassionate, biblically grounded and non-judgmental care. We are here to walk beside you and we strive to create a safe and nurturing space for all.
                </p>
                <p className="font-body">
                  We offer both office and Telehealth sessions as a convenience to you. We proudly support our veterans and active duty personnel as well as civilians who need a little extra support and help.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed">
                <p className="font-body">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading" style={{ color: '#006DD2' }}>The path to healing</span> is a deeply personal journey, but it doesn't have to be walked alone. At Crosspoint Counseling, we believe that restoration begins when grace meets vulnerability. Through the lens of Scripture and the guidance of the Holy Spirit, we walk with you step by step—facing pain, uncovering truth, and embracing transformation with patience prayer and personal support.
                </p>
                <p className="font-body">
                  At the heart of our center is a compassionate team of <b>licensed mental health professionals,</b> including therapists, counselors, and clinical social workers, who provide expert care through both <b>insurance and direct pay options.</b> Alongside them, our <b>registered and student interns</b> offer counseling at a reduced rate.
                </p>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              {/* Desktop: Beach background window, Mobile: Section 3 Image */}
              <div className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl shadow-2xl bg-cover bg-center bg-no-repeat hidden lg:block"
                style={{
                  backgroundImage: 'url("/DSC_7225.jpg")',
                  backgroundAttachment: 'fixed'
                }}
              />
              {/* Mobile Image - Updated to use new image */}
              <img 
                src="/Section-3-Image copy.jpg" 
                alt="Peaceful beach scene with sea oats against blue sky" 
                className="w-full h-64 sm:h-80 lg:hidden rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 text-white p-4 sm:p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#006DD2' }}>
                <p className="font-semibold text-base sm:text-lg font-heading">Christ-Centered Care</p>
                <p className="text-blue-100 text-sm sm:text-base font-body">Mind • Body • Spirit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Counseling Offered Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 109, 210, 0.75)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <button 
              onClick={openCounselingTypes}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading hover:text-blue-200 transition-all duration-300 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Types of Counseling Offered
            </button>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white font-heading">
              We are here for you.
            </h2>
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-6 sm:mb-8 font-body">
              Wherever you find yourself on the healing path, know this: you don't have to walk it alone. Our team
              is ready to support you with compassion, wisdom, and Christ-centered care every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Counseling Types Popup */}
      {isCounselingTypesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-start z-50">
          <div 
            className="bg-white h-full w-full max-w-md overflow-y-auto shadow-2xl transform transition-transform duration-300 ease-in-out"
            style={{ 
              transform: isCounselingTypesOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
                  Types of Counseling Offered
                </h3>
                <button
                  onClick={closeCounselingTypes}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-slate-600 mb-6 font-body">
                We offer a full range of competent Christian counseling services to address issues including:
              </p>

              <div className="space-y-6">
                {counselingTypes.map((type) => (
                  <div key={type.id}>
                    <h4 className="text-lg font-bold mb-3 font-heading" style={{ color: '#006DD2' }}>
                      {type.title}
                    </h4>
                    <ul className="space-y-2 ml-4">
                      {type.services.map((service, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-slate-400 mr-3 mt-1">◦</span>
                          <span className="text-slate-700 font-body">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insurance Accepted Section */}
      <section id="insurance" className="py-12 sm:py-16 lg:py-20 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-heading" style={{ color: '#006DD2' }}>
              Insurance Accepted
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-body">
              We accept most major insurance plans to make quality mental health care accessible to you and your family.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {insuranceProviders.map((provider) => (
              <div 
                key={provider.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center">
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className="hidden w-full h-full rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#006DD2' }}
                  >
                    {provider.name}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-semibold font-heading" style={{ color: '#006DD2' }}>
                  {provider.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-body">
              Don't see your insurance listed? Please contact us to verify coverage. We also offer direct pay options for those without insurance or who prefer to pay out-of-pocket.
            </p>
          </div>
        </div>
      </section>

      {/* Double Wave Divider - Insurance section wave going down */}
      <div className="relative w-full h-16 sm:h-24 overflow-hidden">
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,0 C150,40 350,120 600,60 C850,0 1050,100 1200,60 L1200,0 L0,0 Z" />
        </svg>
      </div>

      {/* Beach Background Gap - Reduced by 75% */}
      <div 
        className="w-full h-6 sm:h-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/DSC_7225.jpg")',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Double Wave Divider - Team section wave coming up */}
      <div className="relative w-full h-16 sm:h-24 overflow-hidden">
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
      {/* Meet our Team Section */}
      <section id="team" className="py-12 sm:py-16 lg:py-20 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-heading" style={{ color: '#006DD2' }}>
              Meet our Team
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-body">
              At the heart of our center is a diverse and dedicated team of professionals who share a common
              calling: to walk alongside others with compassion, clinical excellence, and Christ-centered care.
            </p>
          </div>

          {/* Location Filter */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-gray-50/95 backdrop-blur-sm rounded-lg p-2 shadow-sm overflow-x-auto">
              <div className="flex space-x-1 min-w-max">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors text-sm sm:text-base whitespace-nowrap font-body ${
                      selectedLocation === location
                        ? 'text-white'
                        : 'text-slate-600 hover:bg-gray-100'
                    }`}
                    style={selectedLocation === location ? { backgroundColor: '#006DD2' } : { color: '#006DD2' }}
                    onMouseEnter={(e) => {
                      if (selectedLocation !== location) {
                        e.target.style.color = '#0056B3';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedLocation !== location) {
                        e.target.style.color = '#006DD2';
                      }
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Counselors Grid - Fixed vertical rectangles */}
          <div className="flex flex-wrap justify-center gap-6">
            {filteredCounselors.map((counselor) => (
              <div 
                key={counselor.id} 
                className="bg-gray-50/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center justify-center p-4"
                style={{ width: '190px', height: '285px' }}
                onClick={() => openModal(counselor)}
              >
                <div className="text-center flex flex-col items-center justify-center h-full">
                  <img
                    src={counselor.image}
                    alt={counselor.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 object-cover"
                    style={{ 
                      boxShadow: '0 8px 25px rgba(79, 107, 202, 0.4), 0 0 0 6px #4F6BCA'
                    }}
                  />
                  <h3 className="text-lg sm:text-2xl font-bold mb-1 font-heading" style={{ color: '#006DD2' }}>
                    {counselor.name}
                  </h3>
                  <p className="font-semibold mb-3 text-sm sm:text-base font-body" style={{ color: '#006DD2' }}>{counselor.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Modal */}
      {selectedCounselor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Navigation Arrows */}
            {filteredCounselors.length > 1 && (
              <>
                <button
                  onClick={navigateToPreviousCounselor}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                  style={{ color: '#006DD2' }}
                  aria-label="Previous counselor"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={navigateToNextCounselor}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                  style={{ color: '#006DD2' }}
                  aria-label="Next counselor"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                  <img
                    src={selectedCounselor.image}
                    alt={selectedCounselor.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                    style={{ 
                      boxShadow: '0 6px 20px rgba(79, 107, 202, 0.3), 0 0 0 4px #4F6BCA'
                    }}
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
                      {selectedCounselor.name}
                    </h3>
                    <p className="font-semibold text-base sm:text-lg font-body" style={{ color: '#006DD2' }}>
                      {selectedCounselor.credentials}
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                      {selectedCounselor.locations.map((location) => (
                        <span
                          key={location}
                          className="bg-gray-100 text-slate-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium font-body"
                        >
                          {location} ({getPhoneForLocation(location)})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors ml-4"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Insurance Accepted Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-bold mb-3 font-heading" style={{ color: '#006DD2' }}>
                  Insurance Accepted
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCounselor.insuranceAccepted.map((insurance, index) => (
                    <span
                      key={index}
                      className="bg-white text-slate-700 px-3 py-1 rounded-full text-sm font-medium font-body border"
                    >
                      {insurance}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column - Bio */}
                <div>
                  <h4 className="text-lg font-bold mb-4 font-heading" style={{ color: '#006DD2' }}>
                    About
                  </h4>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-body">
                      {selectedCounselor.bio}
                    </p>
                  </div>
                </div>

                {/* Right Column - Specialties */}
                <div>
                  <h4 className="text-lg font-bold mb-4 font-heading" style={{ color: '#006DD2' }}>
                    Specialties
                  </h4>
                  <ul className="space-y-3">
                    {selectedCounselor.specialties.map((specialty, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1 text-lg">•</span>
                        <span className="text-slate-700 font-body text-sm sm:text-base">{specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
{/* Navigation indicator */}
              {filteredCounselors.length > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {filteredCounselors.map((counselor, index) => (
                    <div
                      key={counselor.id}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        counselor.id === selectedCounselor.id ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      style={counselor.id === selectedCounselor.id ? { backgroundColor: '#006DD2' } : {}}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Map Overlay */}
      {mapLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold font-heading" style={{ color: '#006DD2' }}>
                {mapLocation.name}
              </h3>
              <button
                onClick={closeMap}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-96 sm:h-[500px]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation.address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${mapLocation.name}`}
              />
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-gray-600 text-sm font-body">
                <MapPin className="w-4 h-4 inline mr-2" />
                {mapLocation.address}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600/95 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 109, 210, 0.95)' }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/DSC_7244.jpg"
                alt="Two beach chairs on peaceful shoreline"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="text-white order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 font-heading">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed font-body">
                Taking the first step towards healing and growth is a courageous act. Let us walk alongside you on this transformative journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Overlay */}
      {mapLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold font-heading" style={{ color: '#006DD2' }}>
                {mapLocation.name}
              </h3>
              <button
                onClick={closeMap}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="h-96 sm:h-[500px]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapLocation.address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${mapLocation.name}`}
              />
            </div>
            <div className="p-4 bg-gray-50">
              <p className="text-gray-600 text-sm font-body">
                <MapPin className="w-4 h-4 inline mr-2" />
                {mapLocation.address}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="text-white py-12 sm:py-16 bg-slate-800/95 backdrop-blur-sm" style={{ backgroundColor: 'rgba(30, 37, 54, 0.95)' }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <img 
                  src="/crosspoint - counseling - 40px white.png" 
                  alt="Crosspoint Counseling" 
                  className="h-6 sm:h-8 w-auto"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading">Contact Us</h3>
              <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base font-body">
                We're here to support you—wherever you are. Whether you prefer in-person care or the convenience of telehealth, we're ready to walk alongside you with Christ-centered support and non-judgmental care.
              </p>
            </div>

            {/* Office Locations */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 font-heading">📍 Office Locations</h4>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h5 className="font-semibold text-white mb-2 text-sm sm:text-base font-heading">Crestview</h5>
                  <div className="flex items-start space-x-3 mb-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div 
                      className="text-gray-300 text-sm sm:text-base font-body cursor-pointer hover:text-white transition-colors"
                      onClick={() => openMap('6268 Old Bethel Rd, Crestview, FL 32536', 'Crestview Office')}
                    >
                      <p className="hover:underline">6268 Old Bethel Rd.</p>
                      <p className="hover:underline">Crestview, FL 32536</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <a href="tel:850-353-2677" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-body">850-353-2677</a>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-white mb-2 text-sm sm:text-base font-heading">Niceville</h5>
                  <div className="flex items-start space-x-3 mb-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div 
                      className="text-gray-300 text-sm sm:text-base font-body cursor-pointer hover:text-white transition-colors"
                      onClick={() => openMap('199 Jones Ave, Niceville, FL 32578', 'Niceville Office')}
                    >
                      <p className="hover:underline">199 Jones Ave.</p>
                      <p className="hover:underline">Niceville, FL 32578</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <a href="tel:850-279-4576" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-body">850-279-4576</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Telehealth & Contact */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 font-heading">💻 Telehealth Services</h4>
              <div className="space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3">
                  <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300 text-sm sm:text-base font-body">
                    <p>Can't make it to an office? We offer secure, HIPAA-compliant virtual sessions so you can receive care from the comfort of your home.</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base font-body">Call us or leave a message anytime.</p>
              </div>

              <h4 className="text-base sm:text-lg font-semibold mb-4 font-heading">📧 Email</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <a href="mailto:arhea@crosspoint.church" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all font-body">
                    arhea@crosspoint.church
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <a href="mailto:kmyrick@crosspoint.church" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all font-body">
                    kmyrick@crosspoint.church
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright - Centered and Below */}
          <div className="border-t border-gray-600 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="text-center">
              <div className="text-xs sm:text-sm text-gray-500 font-body">
                © 2025 Crosspoint Counseling. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;