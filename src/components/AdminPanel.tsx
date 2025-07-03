import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  Upload,
  MapPin,
  Shield,
  Users,
  LogOut,
  Camera
} from 'lucide-react';
import ImageUploadCrop from './ImageUploadCrop';

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

interface AdminPanelProps {
  counselors: Counselor[];
  onUpdateCounselors: (counselors: Counselor[]) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ counselors, onUpdateCounselors, onLogout }) => {
  const [editingCounselor, setEditingCounselor] = useState<Counselor | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  const availableLocations = ['Niceville', 'Crestview', 'Telehealth'];
  const availableInsurance = [
    'Aetna', 
    'Florida Blue', 
    'Medicare', 
    'Tricare', 
    'United Healthcare', 
    'UMR', 
    'VACCN',
    'Reduced rate services available'
  ];

  const emptyForm: Counselor = {
    id: '',
    name: '',
    credentials: '',
    image: '',
    locations: [],
    bio: '',
    specialties: [],
    insuranceAccepted: []
  };

  const [formData, setFormData] = useState<Counselor>(emptyForm);

  const filteredCounselors = counselors.filter(counselor =>
    counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    counselor.credentials.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (counselor: Counselor) => {
    setEditingCounselor(counselor);
    setFormData({ ...counselor });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingCounselor(null);
    setFormData({ ...emptyForm, id: Date.now().toString() });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.credentials.trim()) {
      alert('Name and credentials are required');
      return;
    }

    let updatedCounselors;
    if (isAddingNew) {
      updatedCounselors = [...counselors, formData];
    } else {
      updatedCounselors = counselors.map(c => 
        c.id === formData.id ? formData : c
      );
    }

    onUpdateCounselors(updatedCounselors);
    handleCancel();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this counselor?')) {
      const updatedCounselors = counselors.filter(c => c.id !== id);
      onUpdateCounselors(updatedCounselors);
    }
  };

  const handleCancel = () => {
    setEditingCounselor(null);
    setIsAddingNew(false);
    setFormData(emptyForm);
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = formData.locations.includes(location)
      ? formData.locations.filter(l => l !== location)
      : [...formData.locations, location];
    setFormData({ ...formData, locations: newLocations });
  };

  const handleInsuranceToggle = (insurance: string) => {
    const newInsurance = formData.insuranceAccepted.includes(insurance)
      ? formData.insuranceAccepted.filter(i => i !== insurance)
      : [...formData.insuranceAccepted, insurance];
    setFormData({ ...formData, insuranceAccepted: newInsurance });
  };

  const handleSpecialtyAdd = (specialty: string) => {
    if (specialty.trim() && !formData.specialties.includes(specialty.trim())) {
      setFormData({ 
        ...formData, 
        specialties: [...formData.specialties, specialty.trim()] 
      });
    }
  };

  const handleSpecialtyRemove = (index: number) => {
    const newSpecialties = formData.specialties.filter((_, i) => i !== index);
    setFormData({ ...formData, specialties: newSpecialties });
  };

  const handleImageUpdate = (imagePath: string) => {
    setFormData({ ...formData, image: imagePath });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/crosspoint - counseling - logo.png" 
                alt="Crosspoint Counseling" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
                  Admin Panel
                </h1>
                <p className="text-gray-600 font-body">Counselor Management</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-body"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search counselors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
              />
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center space-x-2 px-6 py-2 text-white rounded-lg transition-colors font-body"
              style={{ backgroundColor: '#006DD2' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056B3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#006DD2'}
            >
              <Plus className="w-4 h-4" />
              <span>Add New Counselor</span>
            </button>
          </div>
        </div>

        {/* Counselors Grid */}
        {!editingCounselor && !isAddingNew && (
          <div className="grid gap-6">
            {filteredCounselors.map((counselor) => (
              <div key={counselor.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={counselor.image}
                      alt={counselor.name}
                      className="w-24 h-24 rounded-full object-cover"
                      style={{ 
                        boxShadow: '0 6px 20px rgba(79, 107, 202, 0.3), 0 0 0 4px #4F6BCA'
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold font-heading" style={{ color: '#006DD2' }}>
                          {counselor.name}
                        </h3>
                        <p className="text-gray-600 font-semibold font-body">{counselor.credentials}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {counselor.locations.map((location) => (
                            <span
                              key={location}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium font-body"
                            >
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(counselor)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(counselor.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 font-heading">Specialties</h4>
                        <div className="flex flex-wrap gap-1">
                          {counselor.specialties.slice(0, 3).map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-body"
                            >
                              {specialty}
                            </span>
                          ))}
                          {counselor.specialties.length > 3 && (
                            <span className="text-gray-500 text-xs font-body">
                              +{counselor.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 font-heading">Insurance</h4>
                        <div className="flex flex-wrap gap-1">
                          {counselor.insuranceAccepted.slice(0, 3).map((insurance, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-body"
                            >
                              {insurance}
                            </span>
                          ))}
                          {counselor.insuranceAccepted.length > 3 && (
                            <span className="text-gray-500 text-xs font-body">
                              +{counselor.insuranceAccepted.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit/Add Form */}
        {(editingCounselor || isAddingNew) && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
                {isAddingNew ? 'Add New Counselor' : 'Edit Counselor'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
                    placeholder="Enter counselor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Credentials *
                  </label>
                  <input
                    type="text"
                    value={formData.credentials}
                    onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
                    placeholder="e.g., LCSW, LMHC, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Profile Image
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setShowImageUpload(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-body"
                        style={{ color: '#006DD2' }}
                      >
                        <Camera className="w-4 h-4" />
                        <span>{formData.image ? 'Change Image' : 'Upload Image'}</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
                      placeholder="Or enter image URL manually"
                    />
                    <p className="text-xs text-gray-500 font-body">
                      Use the upload button for automatic cropping to 500x500px, or enter a URL manually.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Locations
                  </label>
                  <div className="space-y-2">
                    {availableLocations.map((location) => (
                      <label key={location} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.locations.includes(location)}
                          onChange={() => handleLocationToggle(location)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 font-body">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
                    placeholder="Enter counselor biography..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Specialties
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Add specialty and press Enter"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-body"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSpecialtyAdd(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1 font-body"
                        >
                          <span>{specialty}</span>
                          <button
                            onClick={() => handleSpecialtyRemove(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
                    Insurance Accepted
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {availableInsurance.map((insurance) => (
                      <label key={insurance} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.insuranceAccepted.includes(insurance)}
                          onChange={() => handleInsuranceToggle(insurance)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 font-body">{insurance}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-body"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 text-white rounded-lg transition-colors font-body"
                style={{ backgroundColor: '#006DD2' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056B3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#006DD2'}
              >
                <Save className="w-4 h-4" />
                <span>{isAddingNew ? 'Add Counselor' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 109, 210, 0.1)' }}>
                <Users className="w-6 h-6" style={{ color: '#006DD2' }} />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
                  {counselors.length}
                </p>
                <p className="text-gray-600 font-body">Total Counselors</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 109, 210, 0.1)' }}>
                <MapPin className="w-6 h-6" style={{ color: '#006DD2' }} />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
                  {availableLocations.length}
                </p>
                <p className="text-gray-600 font-body">Locations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 109, 210, 0.1)' }}>
                <Shield className="w-6 h-6" style={{ color: '#006DD2' }} />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading" style={{ color: '#006DD2' }}>
                  {availableInsurance.length}
                </p>
                <p className="text-gray-600 font-body">Insurance Options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <ImageUploadCrop
          currentImage={formData.image}
          counselorName={formData.name}
          onImageUpdate={handleImageUpdate}
          onClose={() => setShowImageUpload(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;