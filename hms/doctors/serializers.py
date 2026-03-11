from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source="user.username")

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "specialization",
            "experience"
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop("user", None)

        if user_data:
            username = user_data.get("username")
            if username:
                instance.user.username = username
                instance.user.save()

        instance.specialization = validated_data.get(
            "specialization",
            instance.specialization
        )

        instance.experience = validated_data.get(
            "experience",
            instance.experience
        )

        instance.save()

        return instance