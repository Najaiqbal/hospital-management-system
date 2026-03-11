from django.shortcuts import render

# Create your views here.
# from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Doctor
from .serializers import DoctorSerializer

# List all doctors + Create new doctor
class DoctorListCreateView(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


# Retrieve, Update, Delete doctor by ID
class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()   
    serializer_class = DoctorSerializer