"""
Headless Blender Python script to build the DK Cinematic Core model
Run: blender -b -P scripts/build_dk_blender_core.py
"""
import os
import math

try:
    import bpy

    # Purge default scene
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for collection in bpy.data.collections:
        bpy.data.collections.remove(collection)

    col = bpy.data.collections.new("DK_Core_Collection")
    bpy.context.scene.collection.children.link(col)

    # 1. Materials
    # ObsidianMetal
    mat_metal = bpy.data.materials.new(name="ObsidianMetal")
    mat_metal.use_nodes = True
    bsdf_metal = mat_metal.node_tree.nodes.get("Principled BSDF")
    if bsdf_metal:
        bsdf_metal.inputs["Base Color"].default_value = (0.03, 0.03, 0.04, 1.0)
        bsdf_metal.inputs["Metallic"].default_value = 0.95
        bsdf_metal.inputs["Roughness"].default_value = 0.18

    # ElectricRedEmissive
    mat_emissive = bpy.data.materials.new(name="ElectricRedEmissive")
    mat_emissive.use_nodes = True
    bsdf_emissive = mat_emissive.node_tree.nodes.get("Principled BSDF")
    if bsdf_emissive:
        bsdf_emissive.inputs["Base Color"].default_value = (1.0, 0.08, 0.08, 1.0)
        # Check for Emission Color & Strength or Emission
        if "Emission Color" in bsdf_emissive.inputs:
            bsdf_emissive.inputs["Emission Color"].default_value = (1.0, 0.05, 0.05, 1.0)
            bsdf_emissive.inputs["Emission Strength"].default_value = 8.0
        elif "Emission" in bsdf_emissive.inputs:
            bsdf_emissive.inputs["Emission"].default_value = (1.0, 0.05, 0.05, 1.0)

    # 2. 3D Text "DK"
    font_curve = bpy.data.curves.new(type="FONT", name="DK_Text_Curve")
    font_curve.body = "DK"
    font_curve.extrude = 0.18
    font_curve.bevel_depth = 0.03
    font_curve.bevel_resolution = 4
    font_curve.align_x = 'CENTER'
    font_curve.align_y = 'CENTER'

    text_obj = bpy.data.objects.new("DK_Text", font_curve)
    col.objects.link(text_obj)
    bpy.context.view_layer.objects.active = text_obj
    text_obj.select_set(True)

    # Convert to mesh
    bpy.ops.object.convert(target='MESH')
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    text_obj.location = (0, 0, 0)
    text_obj.data.materials.append(mat_metal)

    # 3. 3 Concentric Torus Rings (tilted 30°, -45°, 60°)
    angles = [math.radians(30), math.radians(-45), math.radians(60)]
    radii = [1.6, 1.9, 2.2]
    pipe_radii = [0.03, 0.025, 0.02]

    for i, (angle, r, pr) in enumerate(zip(angles, radii, pipe_radii)):
        bpy.ops.mesh.primitive_torus_add(
            major_radius=r,
            minor_radius=pr,
            major_segments=48,
            minor_segments=16,
            location=(0, 0, 0)
        )
        ring_obj = bpy.context.active_object
        ring_obj.name = f"Gyroscopic_Ring_{i+1}"
        ring_obj.rotation_euler = (angle, angle * 0.5, angle * 0.8)
        # Inner ring gets emissive, outer get metal
        if i == 0:
            ring_obj.data.materials.append(mat_emissive)
        else:
            ring_obj.data.materials.append(mat_metal)

    # 4. Outer wireframe icosphere
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=2.6, location=(0, 0, 0))
    ico_obj = bpy.context.active_object
    ico_obj.name = "Wireframe_Cage"
    wire_mod = ico_obj.modifiers.new(name="Wireframe", type='WIREFRAME')
    wire_mod.thickness = 0.015
    ico_obj.data.materials.append(mat_emissive)

    # 5. Export GLB
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "models")
    os.makedirs(output_dir, exist_ok=True)
    export_path = os.path.join(output_dir, "dk_core.glb")

    bpy.ops.export_scene.gltf(
        filepath=export_path,
        export_format='GLB',
        use_selection=False
    )
    print(f"[DK] exported → public/models/dk_core.glb")

except ImportError:
    print("[DK] Blender 'bpy' module not available in this Python environment. Skipped Blender GLB generation.")
except Exception as e:
    print(f"[DK] Blender export failed: {e}")
