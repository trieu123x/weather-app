export const countries = [
  { name: 'All', code: '', flag: '🌍', cities: [] },
  {
    name: 'Vietnam',
    code: 'VN',
    flag: '🇻🇳',
    cities: [
      'Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Haiphong', 'Can Tho',
      'Bien Hoa', 'Nha Trang', 'Hue', 'Vung Tau', 'Buon Ma Thuot',
      'Da Lat', 'Quy Nhon', 'Vinh', 'Phan Thiet', 'Long Xuyen',
      'Cam Ranh', 'Soc Trang', 'Pleiku', 'Thu Dau Mot', 'Bac Lieu'
    ]
  },
  {
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    cities: [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
      'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco',
      'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington'
    ]
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    cities: [
      'London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool',
      'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester'
    ]
  },
  {
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    cities: [
      'Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo',
      'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama',
      'Hiroshima', 'Sendai', 'Chiba', 'Kitakyushu', 'Nara'
    ]
  },
  {
    name: 'South Korea',
    code: 'KR',
    flag: '🇰🇷',
    cities: [
      'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon',
      'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Goyang'
    ]
  },
  {
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    cities: [
      'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice',
      'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'
    ]
  },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig'] },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City'] },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Hobart'] },
  {
    name: 'China',
    code: 'CN',
    flag: '🇨🇳',
    cities: [
      'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu',
      'Wuhan', 'Hangzhou', 'Chongqing', 'Nanjing', 'Xi\'an'
    ]
  },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬', cities: ['Singapore'] },
  { name: 'Thailand', code: 'TH', flag: '🇹🇭', cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Khai', 'Songkhla', 'Nakhon Ratchasima'] },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩', cities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Palembang', 'Depok'] },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾', cities: ['Kuala Lumpur', 'George Town', 'Johor Bahru', 'Ipoh', 'Shah Alam', 'Petaling Jaya', 'Malacca City'] },
  { name: 'Philippines', code: 'PH', flag: '🇵🇭', cities: ['Manila', 'Quezon City', 'Davao City', 'Cebu City', 'Zamboanga City', 'Taguig', 'Pasig'] },
  { name: 'India', code: 'IN', flag: '🇮🇳', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune'] },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus'] },
  { name: 'Russia', code: 'RU', flag: '🇷🇺', cities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara'] },
  { name: 'Italy', code: 'IT', flag: '🇮🇹', cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence'] },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma'] },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽', cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Toluca', 'Tijuana', 'León', 'Juárez'] },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', cities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'Lucerne', 'St. Gallen'] },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪', cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Upplands Väsby', 'Västerås', 'Örebro', 'Linköping'] },
  { name: 'Norway', code: 'NO', flag: '🇳🇴', cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Bærum', 'Kristiansand', 'Drammen', 'Asker'] },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Almere', 'Groningen'] },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪', cities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven'] },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Lower Hutt', 'Dunedin'] },
]

