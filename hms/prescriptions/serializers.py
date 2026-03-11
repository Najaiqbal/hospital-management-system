from rest_framework import serializers
from .models import Prescription


class PrescriptionSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(source="doctor.user.username",read_only=True)

    patient_name = serializers.CharField(source="patient.user.username",read_only=True)

    class Meta:
        model = Prescription
        fields = "__all__"