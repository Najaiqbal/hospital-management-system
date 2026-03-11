from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):

    patient_name = serializers.SerializerMethodField()
    doctor_name = serializers.SerializerMethodField()
    specialization = serializers.CharField(source="doctor.specialization", read_only=True)

    class Meta:
        model = Appointment
        fields = "__all__"

    def get_patient_name(self,obj):
        return obj.patient.user.username

    def get_doctor_name(self,obj):
        return obj.doctor.user.username